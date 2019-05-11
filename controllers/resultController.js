const mongoose = require('mongoose');
const papaparse = require('papaparse');
const fs = require('fs');
const stream = require('stream');
const flatMap = require('flatmap');
const Result = mongoose.model('Result');
const User = mongoose.model('User');
const Test = mongoose.model('Test');
const Param = mongoose.model('Param');
const Project = mongoose.model('Project');

//show the results on the page with chosen tests
// exports.getResultsOfTest = async (req, res) => {
//   const results = await Result.getResults({ test: req.params.task, project_id: req.user._id });//returns an array
//   res.render('chosentests', {results, task: req.params.task, slug: req.params.slug});
// };

//show the results of one user on a separate page
exports.showMyResults = async (req, res) => {
  const results = await Result.getMyResults({ author: req.user._id });
  res.render('showResults', {results});
};

//download metadata for a user as a csv file
exports.downloadMetadataUser = async (req, res) => {
  const results = await Result.find({ author: req.params.id })
  const name = req.params.identity;
  const data = results.map(e => e.rawdata[0].meta);
  const csv_file = papaparse.unparse({data});
  res.setHeader('Content-disposition', 'attachment; filename=meta_' + name +'.csv');
  res.send(csv_file);
};

//download results of a user as a csv file
exports.downloadResultsUser = async (req, res) => {
  const results = await Result.find({ author: req.params.id, project: req.user.project._id })
  const authoreddata = results.map(u=>{
    u.rawdata.map(e=>{
      return e;
    })
    return u.rawdata;
  }).reduce((a,b)=>a.concat(b),[]);
  const keys = authoreddata.map(e => Object.keys(e)).reduce( (a,b) => Array.from(new Set(a.concat(b))) );
  const name = req.params.identity;
  const csv_file = papaparse.unparse({
     fields: keys,
	   data: authoreddata
   });
  res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
  res.send(csv_file);
};

//download all projects data for an researcher as a csv file
exports.downloadprojectdata = async (req, res) => {
  let keys = [];
  const name = req.user.project.name;
  res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
  const input = new stream.Readable({ objectMode: true });
  input._read = () => {};
  var cursor = await Result
    .find({project: req.user.project._id},{rawdata:1, author:1})
    .cursor()
    .on('data', obj => {
      //return only the results of participants (level < 10)
      if(obj.author.level < 10){
        const preKeys = flatMap(obj.rawdata, function(e){
          return(Object.keys(e));
        });
        const tempkeys = Array.from(new Set(preKeys));
        const new_items = tempkeys.filter(x => !keys.includes(x));
        let parsed;
        if (new_items.length > 0){
          keys = keys.concat(new_items);
          parsed = papaparse.unparse({data: obj.rawdata, fields: keys}) + '\r\n';
        } else {
          const preparsed = papaparse.unparse({data: obj.rawdata, fields: keys}) + '\r\n';
          parsed = preparsed.replace(/(.*\r\n)/,'');
        };
        input.push(parsed);
      }
    })
    .on('end', function() { input.push(null) })
    .on('error', function(err) { console.log(err) });
  const processor = input.pipe(res);
};

//download all projects data for an researcher as a csv file
exports.downloadprojectmetadata = async (req, res) => {
  let first = true;
  const name = req.user.project.name;
  res.setHeader('Content-disposition', 'attachment; filename=meta_' + name +'.csv');
  const input = new stream.Readable({ objectMode: true });
  input._read = () => {};
  var cursor = await Result
    .find({project: req.user.project._id},{rawdata:1, author:1})
    .cursor()
    .on('data', obj => {
      //return only the results of participants (level < 10)
      if(obj.author.level < 10){
        const metadata = obj.rawdata[0].meta;
        const preparsed = papaparse.unparse([metadata]) + '\r\n';
        let parsed;
        if(!first){
          parsed = preparsed.replace(/(.*\r\n)/,'');
        } else {
          parsed = preparsed;
          first = false;
        };
        input.push(parsed);
      }
    })
    .on('end', function() { input.push(null) })
    .on('error', function(err) { console.log(err) });
  const processor = input.pipe(res);
};

//download summary statistics for all users of the project
exports.downloadSummaryData = async (req, res) => {
  let keys = [];
  const name = req.user.project.name;
  res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
  const input = new stream.Readable({ objectMode: true });
  input._read = () => {};
  var cursor = await Result
    .find({project: req.user.project._id},{rawdata:1, author:1})
    .cursor()
    .on('data', obj => {
        if(obj.author.level < 10){
        const preKeys = flatMap(obj.rawdata, function(e){
          return(Object.keys(e));
        });
        const tempkeys = Array.from(new Set(preKeys));
        console.log('Keys', tempkeys);
        const new_items = tempkeys.filter(x => !keys.includes(x));
        let parsed;
        if (new_items.length > 0){
          keys = keys.concat(new_items);
          parsed = papaparse.unparse({data: obj.rawdata, fields: keys}) + '\r\n';
        } else {
          const preparsed = papaparse.unparse({data: obj.rawdata, fields: keys}) + '\r\n';
          parsed = preparsed.replace(/(.*\r\n)/,'');
        };
        input.push(parsed);
      }
    })
    .on('end', function() { input.push(null) })
    .on('error', function(err) { console.log(err) });
  const processor = input.pipe(res);
};

//download csv file for particular test and user
exports.downloadResultTestUser = async (req, res) => {
  const result = await Result.findOne({ _id: req.params.filename });
  const name = req.params.slug;
  const keys = result.rawdata.map(e => Object.keys(e)).reduce( (a,b) => Array.from(new Set(a.concat(b))) );
  const csv_file = papaparse.unparse({
     fields: keys,
	   data: result.rawdata
   });
  res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
  res.send(csv_file);
};

//download csv file for particular test in the project
exports.downloadTestResults = async (req, res) => {
  let keys = [];
  const name =  req.params.name;
  res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
  const input = new stream.Readable({ objectMode: true });
  input._read = () => {};
  var cursor = await Result
    .find({project: req.user.project._id, test: req.params.test},{rawdata:1})
    .cursor()
    .on('data', obj => {
      const preKeys = flatMap(obj.rawdata, function(e){
        return(Object.keys(e));
      });
      const tempkeys = Array.from(new Set(preKeys));
      const new_items = tempkeys.filter(x => !keys.includes(x));
      let parsed;
      if (new_items.length > 0){
        keys = keys.concat(new_items);
        parsed = papaparse.unparse({data: obj.rawdata, fields: keys}) + '\r\n';
      } else {
        const preparsed = papaparse.unparse({data: obj.rawdata, fields: keys}) + '\r\n';
        parsed = preparsed.replace(/(.*\r\n)/,'');
      };
      input.push(parsed);
    })
    .on('end', function() { input.push(null) })
    .on('error', function(err) { console.log(err) });
  const processor = input.pipe(res);
};

//delete data
exports.removeResultsData = async (req, res) => {
  const result = await Result.findOneAndRemove({ _id: req.params.filename });
  req.flash('success', `${res.locals.layout.flash_data_deleted}`);
  res.redirect('back');
};

exports.openDataForParticipant = async (req, res) => {
  const result = await Result.findOne({ _id: req.params.filename });
  if (result){
    result.openDataForParticipant = !result.openDataForParticipant;
    await result.save();
    req.flash('success', `${res.locals.layout.flash_request_recorded}`);
    res.redirect('back');
  } else {
    req.flash('error', `${res.locals.layout.flash_not_authorized}`);
    res.redirect('back');
  }
};

//post delete request
exports.changeStatusOfDeleteRequest = async (req, res) => {
  //check whether the result is authored by a user
  const result = await Result.findOne({ _id: req.params.filename });
  if (result && result.author && result.author._id && req.user._id.toString() == result.author._id.toString() ){
    result.deleteRequest = !result.deleteRequest;
    await result.save();
    req.flash('success', `${res.locals.layout.flash_request_recorded}`);
    res.redirect('back');
  } else {
    req.flash('error', `${res.locals.layout.flash_not_authorized}`);
    res.redirect('back');
  }
};

exports.changeStatusOfDataRequest = async (req, res) => {
  //check whether the result is authored by a user
  const result = await Result.findOne({ _id: req.params.filename });
  if (result && result.author && result.author._id && req.user._id.toString() == result.author._id.toString() ){
    result.dataRequest = !result.dataRequest;
    await result.save();
    req.flash('success', `${res.locals.layout.flash_request_recorded}`);
    res.redirect('back');
  } else {
    req.flash('error', `${res.locals.layout.flash_not_authorized}`);
    res.redirect('back');
  }
};

//save results during the task
exports.saveIncrementalResults = async (req, res) => {
  const slug = req.body.url.split('/')[4];
  const test = await Test
    .findOne({ slug })
    .select({slug:1});

  if(req.body.data && req.body.data.length !== 0){
    req.body.data.map(row => {
      row["openLabId"] = req.user.openLabId || "undefined";
      row["type"] =  req.body.metadata.payload || "undefined";
      row["task"]= slug || "undefined";
      row['project'] = req.user.participantInProject || req.user.project._id;
      row['status'] = req.user.level > 10 ? 'researcher' : 'participant';
      row['code'] = (req.user.code && req.user.code.id) || "undefined";
    })
  };

  if (req.body.metadata.payload == 'incremental'){
    let result = await Result.findOne({transfer: req.body.metadata.id, uploadType: req.body.metadata.payload});
    if(!result){
      const parameters = await Param.getParameters({
        slug: slug,
        language: req.user.language,
        author: req.user.participantInProject || req.user.project._id
      });
      let params = "no-change-of-params";
      if(parameters){
        if(parameters[0]){
          if (parameters[0].parameters){
          params = parameters[0].parameters;
          }
        }
      }
      const result = new Result({
        transfer: req.body.metadata.id,
        author: req.user._id,
        openLabId: req.user.openLabId,
        project: req.user.participantInProject || req.user.project._id,
        test: test._id,
        taskslug: slug,
        rawdata: req.body.data,
        uploadType: req.body.metadata.payload,
        parameters: params
      });
      await result.save();
    } else {
      const updatedResult = await Result.findOneAndUpdate({
        transfer: req.body.metadata.id,
        uploadType: req.body.metadata.payload
      }, { $push: {rawdata: {$each: req.body.data } }}, {
        new: true
      }).exec();
    };
    res.send('saved');

  } else if(req.body.metadata.payload == 'full'){
    const parameters = await Param.getParameters({
      slug: slug,
      language: req.user.language,
      author: req.user.participantInProject || req.user.project._id
    });
    let params = "no-change-of-params";
    if(parameters){
      if(parameters[0]){
        if (parameters[0].parameters){
        params = parameters[0].parameters;
        }
      }
    }

    let aggregated;
    if(req.body.data && req.body.data.length !== 0){
      aggregated = req.body.data
        .filter(row => {
          return (typeof(row.aggregated) !== 'undefined')
        })
        .map(e => e.aggregated)
    };

    const fullResult = new Result({
      transfer: req.body.metadata.id,
      author: req.user._id,
      openLabId: req.user.openLabId,
      project: req.user.participantInProject || req.user.project._id,
      test: test._id,
      taskslug: slug,
      rawdata: req.body.data,
      uploadType: req.body.metadata.payload,
      parameters: params,
      aggregated: aggregated
    });

    await fullResult.save();

    res.send('Saved all results');
  } else {
    res.send('Unknown upload data type');
  }
};

//show the results for each test
exports.showDataByTests = async (req, res) => {
  let test, results, projectTests;
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, tests: 1, tests: 1
  });
  if(project){
    const unsortedProjectTests = await Test
      .find({
        _id: { $in: project.tests},
        author: { $exists: true }
      })
      .select({slug:1, name:1, photo:1})
    //order projectTests
    projectTests = unsortedProjectTests.sort( (a, b) => {
      return project.tests.indexOf(a.id) - project.tests.indexOf(b.id);
    });
  };
  const slug = req.params.slug;
  if (slug && project){
    test = await Test.findOne({slug: slug},{_id:1, name:1, slug:1});
    results = await Result.getResults({ test: test._id, project: req.user.project._id });//returns an array
  }
  res.render('resultsByTests', {project, slug, test, results, projectTests});
};


//show results of a particular test and a user
exports.showResults = async (req, res) => {
  const test = await Test.findOne({ slug: req.params.slug });
  const user = await User.findOne({ _id: req.params.id });
  if(!test || !user) return next();
  //find already existing results if they are in the database (otherwise would be null)
  const results = await Result.find({ test: test._id, author: user._id});//returns an array
  res.render('showResults', {test, user, results, title: test.name});
};
