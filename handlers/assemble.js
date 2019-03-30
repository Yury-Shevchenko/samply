const cloneDeep = require('lodash/cloneDeep');
const fromPairs = require('lodash/fromPairs');
const toString = require('lodash/toString');
const toNumber = require('lodash/toNumber');
const zip = require('lodash/zip');
const pickBy = require('lodash/pickBy');
const groupBy = require('lodash/groupBy');
const isEmpty = require('lodash/isEmpty');
const flatMap = require('lodash/flatMap');
const serialize = require('serialize-javascript')
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const cloudinary = require('cloudinary');

exports.convertJSON = async (state, foldername, production = 'alpha', stateModifier=state => state, additionalFiles={}) => {
  // Apply modification function to copy of current state
  const updatedState = stateModifier(cloneDeep(state));
  const redirects = {
    full: function(){
      window.location = '/testing';
    }
  };
  //add plugin to emit post event at the end of the study
  updatedState.components.root.plugins = [
    ...state.components.root.plugins,
    //{ type: 'lab.plugins.PostMessage' },
    { type: 'lab.plugins.Transmit', url: '/save', callbacks: redirects}
    //https://github.com/FelixHenninger/lab.js/blob/master/packages/library/src/plugins/transmit.js
  ]
  const main_sequence_number = Object.values(updatedState.components)
    .filter(el => el.id == 'root')
    .map(e => e.children[0])
  //console.log("main_sequence_number", main_sequence_number);
  const params = Object.values(updatedState.components)
    .filter(el => el.id == main_sequence_number)
    .map(e => e.parameters)
    .map(r => r.rows)
    .reduce((flat, next) => flat.concat(next), [])
    .reduce((flat, next) => flat.concat(next), [])
    .filter(p => typeof(p) != "undefined" && p.name != '')
  //console.log("Params", params);

  const filesInUse = embeddedFiles(updatedState.components)

  const files = pickBy(
    updatedState.files.files,
    (file, filename) =>
      file.source !== 'embedded' ||
      filesInUse.includes(filename) ||
      file.source == 'embedded'
  )

  const uploadFile = async (item) => {
    const name = item[0].split(`${item[1].source == "embedded" ? "embedded" : "static"}/`)[1];
    const string = item[1].content;
    const truncatedName = name.split('.')[0];
    const location = `${foldername}/${truncatedName}`;
    const upload_preset = "openlab";
    const options = {
      public_id: location,
      resource_type: 'auto'
    };
    await cloudinary.v2.uploader.unsigned_upload(
      string,
      upload_preset,
      options,
      function(error, result) {
        // console.log(result.secure_url);
        for (let [key, value] of Object.entries(updatedState.components)){
          if (value.files && value.files.rows && value.files.rows.length > 0) {
            value.files.rows.map(o => {
              o.map(e => {
                if (e.poolPath == item[0]){
                  e.poolPath = result.secure_url;
                }
              })
            });
          }
        }

      }
    );
    // const dir = 'public/embedded/' + foldername;
    // !fs.existsSync(dir) && fs.mkdirSync(dir);
    // const writableStream = fs.createWriteStream(dir + '/' + name);
    // getUri(string, (err, res) => {
    //   if (err) throw err;
    // res.pipe(writableStream);
    // })
  }

  const arr = Object.entries(files).filter(i => {
    return (i && i[1] && (i[1].source == "embedded" || i[1].source == "embedded-global"))
  });

  await Promise.all(arr.map(item => {
    return uploadFile(item)
  }))
    // .then(data => {
    //   console.log("Data", data);
    // })

    return {
        files: {
          'script': {
            content: readDataURI(makeDataURI(
              makeScript(updatedState),
              'application/javascript',
            ))
          },
          ...updatedState.files.files,
          ...additionalFiles,
        },
        bundledFiles: fromPairs(Object.entries(updatedState.files.bundledFiles).map(
          // Add source path to data, so that bundled files can be moved
          ([path, data]) => [path, { source: path, ...data }]
        )),
        params: params,
        production: production
      }

  // Reassemble state object that now includes the generated script,
  // as well as any additional files required for the deployment target

}

//https://github.com/FelixHenninger/lab.js/blob/master/packages/builder/src/logic/util/files.js
const embeddedFiles = components => {
  // Collect files embedded in components
  // (extract files from component file setting,
  // and the file URL from there)
  const componentFiles = Object.entries(components)
    .map(([_, { files }]) => files && files.rows ? files.rows : [])
    .filter(files => files.length > 0)
  // console.log("component files", componentFiles[0]);

  return flatMap(
    componentFiles,
    c => c.map(f => f[0].poolPath)
  )
}

//https://github.com/FelixHenninger/lab.js/blob/master/packages/builder/src/logic/io/assemble/script.js
// Generic grid processing
const processGrid = (grid, colnames=null, types=undefined) =>
  grid.rows
    // Filter rows without data
    .filter( r => !r.every( c => c.trim() === '' ) )
    // Convert types if requested
    .map( r => r.map( (c, i) => makeType(c, types ? types[i] : undefined) ) )
    // Use column names to create array of row objects.
    // If column names are passed as a parameter,
    // use those, otherwise rely on the grid object
    .map( r => fromPairs(zip(colnames || grid.columns, r)) )

const processFiles = files =>
  fromPairs(
    files.rows
      .map(r => r[0])
      .map(r => [r.localPath.trim(), r.poolPath.trim()])
  )

const processMessageHandlers = (messageHandlers) =>
  fromPairs(
    messageHandlers.rows
      .map(r => r[0])
      .filter(h => h.message.trim() !== '' && h.code.trim() !== '')
      // TODO: Evaluate the safety implications
      // of the following de-facto-eval.
      .map(h => [
        h.message,
        adaptiveFunction(h.code)
      ])
  )

const processParameters = parameters =>
  fromPairs(
    parameters.rows
      .map(r => r[0])
      .filter(r => r.name.trim() !== '' && r.value.trim() !== '')
      .map(r => [r.name.trim(), makeType(r.value, r.type)])
  )

const createResponsePair = r =>
  // Process an object with the structure
  // { label: 'label', event: 'keypress', ...}
  // into an array with two parts: a label,
  // and an event definition, such as
  // ['keypress(r)', 'red']
  [
    `${ r.event }` +
      `${ r.filter ? `(${ r.filter.trim() })` : ''}` +
      `${ r.target ? ` ${ r.target.trim() }`  : ''}`,
    r.label.trim()
  ]

// Process individual fields
const processResponses = (responses) => {
  // Process responses as a grid, resulting in an array
  // of objects that contain the individual parts
  const grid = processGrid(responses, ['label', 'event', 'target', 'filter'])
  // Process each of these objects into an array
  // of [responseParams, label] pairs
  const pairs = grid.map(createResponsePair)
  // Finally, create an object of
  // { responseParams: label } mappings
  return fromPairs(pairs)
}

// Template parameters are also a grid,
// but column names and data types are defined
// as properties of an object.
const processTemplateParameters = grid =>
  processGrid(
    grid,
    grid.columns.map(c => c.name.trim()),
    grid.columns.map(c => c.type)
  )

const processShuffleGroups = columns =>
  Object.values(
    // Collect columns with the same shuffleGroup property
    groupBy(
      columns.filter(c => c.shuffleGroup !== undefined),
      'shuffleGroup'
    )
  ).map(
    // Extract column names
    g => g.map(c => c.name)
  )

// Process any single node in isolation
const processNode = node => {
  // Options to exclude from JSON output
  const filteredOptions = ['skipCondition']

  // TODO: This filters empty string values, which are
  // created by empty form fields in the builder. This is
  // hackish, and may not work indefinately -- it might
  // have to be solved on the input side, or by making
  // the library more resilient to malformed input.
  // Either way, this is probably not the final solution.
  const filterOptions = (value, key) =>
    value !== '' &&
    !(key.startsWith('_') || filteredOptions.includes(key))

  return Object.assign({}, pickBy(node, filterOptions), {
    files: node.files
      ? processFiles(node.files)
      : {},
    messageHandlers: node.messageHandlers
      ? processMessageHandlers(node.messageHandlers)
      : node.messageHandlers,
    parameters: node.parameters
      ? processParameters(node.parameters)
      : {},
    responses: node.responses
      ? processResponses(node.responses)
      : {},
    skip: node.skip || node.skipCondition || undefined,
    templateParameters: node.templateParameters
      ? processTemplateParameters(node.templateParameters)
      : node.templateParameters,
    shuffleGroups: node.templateParameters
      ? processShuffleGroups(node.templateParameters.columns || [])
      : node.shuffleGroups,
  })
}

// Process a node and its children
const makeComponentTree = (data, root) => {
	const currentNode = processNode(data[root])

  if (currentNode) {
    const output = Object.assign({}, currentNode)

    // Convert children, if available
    if (currentNode.children) {
      switch (currentNode.type) {
        case 'lab.flow.Sequence':
          // A sequence can have several components as content
          output.content = currentNode.children
            .map(c => makeComponentTree(data, c))
          break
        case 'lab.flow.Loop':
          // A loop has a single template
          if (!isEmpty(currentNode.children)) {
            output.template = makeComponentTree(data, currentNode.children[0])
          }
          break
        case 'lab.canvas.Frame':
        case 'lab.html.Frame':
          // A loop has a single template
          if (!isEmpty(currentNode.children)) {
            output.content = makeComponentTree(data, currentNode.children[0])
          }
          break
        default:
          // TODO: This won't catch canvas-based
          // components, but it also doesn't need
          // to right now.
          break
      }

      // After parsing, children components are no longer needed
      delete output.children
    }

    // Delete unused fields
    delete output.id

    return output
  } else {
    return {}
  }
}

const makeStudyScript = studyTreeJSON =>
`// Define study
const study = lab.util.fromObject(${ studyTreeJSON })
//assign parameters from the database
Object.assign(study.options.content[0].options.parameters, params || {})
// Let's go!
study.run()`

const makeScript = (state) => {
  // Process study tree
  const componentTree = makeComponentTree(state.components, 'root')
  const studyTreeJSON = serialize(componentTree, { space: 2 })
  return makeStudyScript(studyTreeJSON)
}

//https://github.com/FelixHenninger/lab.js/blob/master/packages/builder/src/logic/util/makeType.js
const makeType = (value, type) => {
  if (type === undefined) {
    // Return value unchanged
    return value
  } else {
    // Convert types
    switch (type) {
      case 'string':
        // Trim strings to avoid problems
        // caused by invisible spaces
        return toString(value).trim()
      case 'number':
        return value.trim() === '' ? null : toNumber(value)
      case 'boolean':
        // Only 'true' and 'false' are
        // accepted as values.
        // eslint-disable-next-line default-case
        switch (value.trim()) {
          case 'true':
            return true
          case 'false':
            return false
        }
      // eslint-disable-next-line no-fallthrough
      default:
        return null
    }
  }
}

//https://github.com/FelixHenninger/lab.js/blob/master/packages/builder/src/logic/util/dataURI.js
const makeDataURI = (data, mime='') =>
  // Make data url from string
  `data:${ mime },${ encodeURIComponent(data) }`

const re = /^\s*data:([-+.\w\d]+\/[-+.\w\d]+)?(;base64)?,(.*)$/

const readDataURI = uri => {
  // Split data URI into constituent parts
  const [, mime, encoding, data] = re.exec(uri)

  // Is the content encoded as base64?
  const base64 = encoding === ';base64'

  return {
    data: base64 ? data : decodeURIComponent(data),
    mime, base64
  }
}

const mimeFromDataURI = uri => re.exec(uri)[1]

const blobFromDataURI = uri => {
  const { data, mime, base64 } = readDataURI(uri)

  if (base64) {
    // Convert base64 to binary
    const binary = window.atob(data)
    // Decode raw bytes
    const bytes = new Uint8Array(binary.length)
    for (var i = 0; i < binary.length; i++)        {
      bytes[i] = binary.charCodeAt(i)
    }
    // Return as blob
    return new Blob([bytes], { type: mime })
  } else {
    // Return blob from string data
    return new Blob([data], { type: mime })
  }
}

const sizeFromDataURI = uri =>
  // Calculate a file size in KB
  //
  // base64 encoding inflates the file, storing 6 bits in every 8-bit
  // character; the initial data URI indicator and the trailing equal
  // sign don't count toward the file size.
  //
  // TODO: Even with all of these corrections, this is an approximation,
  // and will differ from OS file managers. Corrections are welcome!
  Math.ceil(
    0.75 * (uri.length - uri.indexOf(',') - 1)
    / 1000
)

const updateDataURI = (uri, updater, ...args) => {
  const { data, mime } = readDataURI(uri)
  const newData = updater(data, ...args)
  return makeDataURI(newData, mime)
}

//https://github.com/FelixHenninger/lab.js/blob/master/packages/builder/src/logic/util/async.js
// Regex for detecting awaits in a code snippet
const awaitRegex = /(^|[^\w])await\s+/m

// Async function constructor
// The eval call here is needed to circumvent CRA's polyfills,
// and probably can be removed at some later point
// eslint-disable-next-line no-new-func
const AsyncFunction = new Function(
  'return Object.getPrototypeOf(async function(){}).constructor'
)()

const adaptiveFunction = code =>
  // Build an async function if await appears in the source
  // NOTE: This is a relatively coarse and naive check.
  // It works for us™ because we don't need to be careful
  // about accidentally declaring a function async:
  // In the situations where we apply them, the return values
  // are not important, just that the function returns at all.
  // Alternatively, we could check whether parsing the function
  // works, and listen for syntax errors. I'm lazy. -F
  code.match(awaitRegex)
    ? new AsyncFunction(code)
    // eslint-disable-next-line no-new-func
: new Function(code)
