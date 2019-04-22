const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');//make unique identifier
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const Project = mongoose.model('Project');
const Test = mongoose.model('Test');
const User = mongoose.model('User');
const Result = mongoose.model('Result');
const Param = mongoose.model('Param');
const keys = require('../config/keys');
const assemble = require('../handlers/assemble');
const slug = require('slugs');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isOk = file.mimetype.startsWith('image/') || file.mimetype.startsWith('application/json') ;
    if(isOk){
      next(null, true);
    } else {
      next( { message: 'That filetype is not allowed '}, false);
    }
  }
};

exports.homePage = async (req, res) => {
  res.render('index', {title: 'Welcome'});
};

exports.aboutPage = async (req, res) => {
  res.render('about');
};

exports.researcherPage = async (req, res) => {
  res.render('researcher', {action: req.params.action});
};

exports.participantPage = async (req, res) => {
  res.render('participant', {action: req.params.action});
};

exports.forgot = async (req, res) => {
  res.render('login', {title: 'Welcome', forgot: true});
};

exports.docs = (req, res) => {
  res.render('docs', {page: req.params.page || 'intro'});
};

exports.adminPage = (req, res) => {
  res.render('admin', {title: 'Administrator'});
};

exports.addTest = (req, res) => {
  res.render('editTest');
};

exports.upload = multer(multerOptions).fields([
  {name: 'script'},
  {name: 'photo'}
]);

exports.resize = async (req, res, next) => {
  if (req.files.photo && typeof(req.body.lucky) == 'undefined') {
    const extension = req.files.photo[0].mimetype.split('/')[1];
    if(!req.body.photo){
      req.body.photo = `${uuid.v4()}.${extension}`;
    };
    const photo = await jimp.read(req.files.photo[0].buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    next();
  } else {
    if(!req.body.photo && typeof(req.body.lucky) != 'undefined' && req.body.lucky == 'on'){
      const photo = await jimp.read('https://source.unsplash.com/random');//https://source.unsplash.com/featured/?moon
      if (photo){
        const extension = photo._originalMime.split('/')[1];
        req.body.photo = `${uuid.v4()}.${extension}`;
        await photo.resize(800, jimp.AUTO);
        await photo.write(`./public/uploads/${req.body.photo}`);
      }
    };
    next();
    return;
  }
};

exports.createTest = async (req, res, next) => {
  req.body.author = req.user._id; //when the test is created the current id is put in the author
  if(req.files.script){
    const json_string = req.files.script[0].buffer.toString();
    const json = JSON.parse(json_string);
    const script = await assemble.convertJSON(json, req.body.name);
    req.body.file = script.files.script.content.data;
    req.body.css = script.files['style.css'].content;
    req.body.params = script.params;
    req.body.created = new Date().toISOString();
    req.body.scriptUpdated = new Date().toISOString();
    req.body.json = json_string;
    req.body.production = script.production;
    req.body.labjsVersion = json.version;
  }
  const test = await (new Test(req.body)).save();
  req.body.slug = test.slug;
  req.body._id = test._id;
  next();
};

exports.updateTest = async (req, res, next) => {
  if(req.user && req.user.project && req.user.project.tests){
    const usertests = req.user.project.tests;
    const id = req.params.id.toString();
    if(usertests.indexOf(id) > -1){
      throw Error('You must remove test from your active program before editing it!');
    };
  }
  if(req.user){
    req.body.author = req.user._id;
  }
  req.body.token = undefined;
  req.body.tokenExpires = undefined;
  if(req.files.script){
    const json_string = req.files.script[0].buffer.toString();
    const json = JSON.parse(json_string);
    const script = await assemble.convertJSON(json, req.body.name);
    req.body.file = script.files.script.content.data;
    req.body.css = script.files['style.css'].content;
    req.body.params = script.params;
    req.body.json = json_string;
    req.body.production = script.production;
    req.body.labjsVersion = json.version;
    req.body.scriptUpdated = new Date().toISOString();
  };

  let newSlug = slug(req.body.name);
  if (newSlug != req.body.slug){
    const slugRegEx = new RegExp(`^(${newSlug})((-[0-9]*$)?)$`, 'i');//regular expression
    const testsWithSlug = await Test.find({ slug: slugRegEx, _id: { $ne: req.params.id } });
    if(testsWithSlug.length){
      newSlug = `${newSlug}-${testsWithSlug.length + 1}`;
    }
    req.body.slug = newSlug;
  };

  const test = await Test.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, //return the new user instead of the old one
    runValidators: true
  }).exec();
  req.body.slug = test.slug;
  req.body._id = test._id;
  next();
};

//transfer the user after adding the test
exports.transfer = (req, res) => {
  req.flash('success', `${res.locals.layout.flash_test_updated} <strong>${req.body.name}</strong>. <a target="_blank" href="/test/${req.body.slug}/${req.user._id}">${res.locals.layout.flash_try_test}</a> `);
  res.redirect(`/tests/${req.body._id}/edit`);
}

//show the tests created by the user
exports.getMyTests = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 18;
  const skip = (page * limit) - limit;
  const testsPromise = Test
    .showMyTests(req.user._id)
    .skip(skip)
    .limit(limit)
    .sort( {position: 'asc'} );
  const countPromise = Test.where({author: req.user._id}).countDocuments();
  const [tests, count] = await Promise.all([ testsPromise, countPromise ]);
  const pages = Math.ceil(count / limit);
  if(!tests.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/tests/my/page/${pages}`);
    return;
  }
  res.render('tests', {title: 'My tests', tests, page, pages, count, type: 'my'});
};

//show the tests created by the user
exports.getAllTests = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 18;
  const skip = (page * limit) - limit;
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };
  const tagsPromise = Test.getTagsList(req.user._id); //use a custom function to get tags list
  const testsPromise = Test
    .find({
      $or:[
        {
          tags: tagQuery,
          open: true,
          author: { $exists: true }
        },
        {
          tags: tagQuery,
          open: false,
          author: { $eq: req.user._id}
        }
      ]
    },{
      name: 1, slug: 1, description: 1, author: 1, photo: 1, open: 1, production: 1,
    })
    .skip(skip)
    .limit(limit);
  const countPromise = Test.where({
    $or:[
      {
        tags: tagQuery,
        open: true,
        author: { $exists: true }
      },
      {
        tags: tagQuery,
        open: false,
        author: { $eq: req.user._id}
      }
    ]
    }).countDocuments();
  const [tests, count, tags] = await Promise.all([ testsPromise, countPromise, tagsPromise ]);
  const pages = Math.ceil(count / limit);
  if(!tests.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/tests/all/${tag ? tag + '/' : ''}page/${pages}`);
    return;
  }
  res.render('tests', {tests, page, pages, count, tag, tags, type: 'all'});
};

//edit the test
exports.editTest = async (req, res) => {
  const test = await Test.findOne({ _id: req.params.id });
  confirmOwner(test, req.user);
  res.render('editTest', {test: test});
};

//to confirm the owner
const confirmOwner = (test, user) => {
  if(!test.author.equals(user._id) || user.level <= 10){
    throw Error('You must own a test in order to edit it!');
  }
};

//download lab.js json file
exports.downloadJSON = async (req, res) => {
  const test = await Test.findOne({ _id: req.params.id });
  const file = JSON.parse(test.json);
  res.setHeader('Content-disposition', 'attachment; filename=' + test.name +'.json');
  res.send(file);
};

exports.openJSONinLabJS = async (req, res) => {
  const test = await Test.findOne({ _id: req.params.id });
  const file = test.json;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-disposition', 'attachment; filename=' + test.name +'.json');
  res.send(file);
};


exports.tryRemoveTest = async (req, res) => {
  const test = await Test.findOne({_id: req.params.id});
  if((!test.author.equals(req.user._id) && req.user.level < 100) || req.user.level < 10){
    req.flash('error', `You must own a test in order to delete it!`);
    res.redirect('back');
  } else {
    const resultsCount = await Result.where({ test: req.params.id }).countDocuments();
    const parametersCount = await Param.where({ test: req.params.id }).countDocuments();
    res.render('deleteForm', {test, resultsCount, parametersCount });
  }
};

//delete the test
exports.removeTest = async (req, res) => {
  const test = await Test.findOne({_id: req.params.id});
  if (req.user.level > 100 || req.body.confirmation == test.name){
    if(test.photo){
      const photo_address = `./public/uploads/${test.photo}`;
      fs.stat(photo_address, function (err, stats) {
        if (err) {
          return console.error(err);
        }
        fs.unlink(photo_address,function(err){
          if(err) return console.log(err);
        });
      });
    }
    test.remove((testErr, removedTest) => {
      req.flash('success', `${res.locals.layout.flash_test_deleted}`);
      res.redirect('/tests/my');
    });
  } else {
    req.flash('error', `${res.locals.layout.flash_test_cannot_delete}`);
    res.redirect('back');
  }
};

//display constructor of tests (with all tags, tests in the database, and chosen tests)
exports.constructor = async (req, res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, tests: 1,
  });
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true };
  const tagsPromise = Test.getTagsList(req.user._id); //use a custom function to get tags list
  //get only own private tests and tests that are opened by other researchers
  let testsPromise;
  let projectTestsPromise;
  if(project){
    projectTestsPromise = Test
      .find({
        // tags: tagQuery,
        _id: { $in: project.tests},
        // open: true,
        author: { $exists: true }
      })
      .select({slug:1, name:1})
      // .sort({name: );

    testsPromise = Test
      .find({
        $or:[
          {
            tags: tagQuery,
            _id: { $nin: project.tests},
            open: true,
            author: { $exists: true }
          },
          {
            tags: tagQuery,
            _id: { $nin: project.tests},
            open: false,
            author: { $eq: req.user._id}
          }
        ]
      })
      .select({author:1, slug:1, name:1, description: 1})
      .sort({name: 1});
  } else {
    testsPromise = Test.find({
      $or:[
        {
          tags: tagQuery,
          open: true,
          author: { $exists: true }
        },
        {
          tags: tagQuery,
          open: false,
          author: { $eq: req.user._id}
        }
      ]
    })
    .select({author:1, slug:1, name:1, description: 1})
    .sort({name: 1});
  };

  const [tags, tests, unsortedProjectTests] = await Promise.all([ tagsPromise, testsPromise, projectTestsPromise ]);
  //order projectTests
  const projectTests = unsortedProjectTests.sort( (a, b) => {
    return project.tests.indexOf(a.id) - project.tests.indexOf(b.id);
  });
  res.render('construct', { title: 'Select tests', tag, tags, tests, projectTests, project });
};

//add or remove a test from the list of chosen tests
//TODO make more robust against deleting the test
exports.featureTest = async (req, res) => {
  const project = await Project.findOne({ _id: req.user.project._id});

  const addedTests = project.tests.map(obj => obj.toString());
  const operator = addedTests.includes(req.params.id)? '$pull' : '$addToSet';
  const test = await Test.findOne({_id: req.params.id},{
    _id: 1
  });

  if(operator === '$pull'){
    const user_pull = await Project
      .findOneAndUpdate({_id: req.user.project._id},
        { ['$pull'] : {
          tests: req.params.id
        } },
        { new : true }
    );
    res.send(user_pull);
  } else {
    const user_push = await Project
      .findOneAndUpdate({_id: req.user.project._id},
        { ['$addToSet'] : {
          tests: req.params.id
        } },
        { new : true }
    );
    res.send(user_push);
  };
};

//search test by keyword
exports.searchTests = async (req, res) => {
  const tests = await Test
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  .sort({
    score: { $meta: 'textScore' }
  })
  .limit(5);
  res.json(tests);
};

//show the separate screen for a test
exports.getTestBySlug = async (req, res, next) => {
  const test = await Test.findOne({ slug: req.params.slug });
  if(!test) return next();
  let author = 'missing';
  author = await User.findOne({ _id: test.author });
  res.render('test', { test, author: author, title: test.name });
};

//get tests that are chosen by the researcher
exports.getProgramTests = async (req, res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, tests: 1,
  });

  const unsortedProjectTests = await Test
    .find({
      _id: { $in: project.tests},
      author: { $exists: true }
    })
    .select({slug:1, name:1, photo:1})
  //order projectTests
  const projectTests = unsortedProjectTests.sort( (a, b) => {
    return project.tests.indexOf(a.id) - project.tests.indexOf(b.id);
  });

  const slug = req.params.slug;
  let param_language = req.params.lang || req.user.language;
  let test = 'nope';
  let original = 'nope';
  let modified = 'nope';
  let allParams = 'nope';
  let savedParameter = 'nope';

  if (slug){
    test = await Test.findOne({slug: slug},{_id:1, name:1, slug:1, params:1, description:1, version:1, script: 1});
  };

  if (test == null){
    test = 'nope';
  } else {
    const selector = req.params.selector;
    if (selector === 'original') {
      if(test){
        original = test.params || 'empty';
      } else {
        original = 'empty';
      };
    }
    if (selector === 'modified') {
      const params = await Param.findOne({project: req.user.project._id, test: test._id, language: param_language});
      allParams = await Param.find({project: req.user.project._id},{slug:1, language:1, created: 1});
      if(params){
        modified = params.parameters || 'empty';
      } else {
        modified = 'empty';
      };
    };
    if(selector === 'upload'){
      if(req.query.savedParameter != ''){
        savedParameter = await Param.findOne({_id: req.query.savedParameter});
        allParams = await Param.find({project: req.user.project._id},{slug:1, language:1, created: 1});
        param_language = savedParameter.language;
      }
    }
  }

  res.render('program', {project, slug, test, original, modified, allParams, savedParameter, param_language, projectTests});
};

//for participants
//show the screen with all tests in a sequence
exports.testing = async (req, res) => {
  const study = req.query.study;
  const project = await Project.findOne({ _id: req.user.participantInProject || req.user.project._id },{
    name: 1, showCompletionCode: 1, useNotifications: 1, tests: 1,
  });

  const projects = await Project.getCurrentProjects();
  let tests, results, confirmationCode, projectTests;
  if(project){
    const unsortedProjectTests = await Test
      .find({
        _id: { $in: project.tests},
        author: { $exists: true }
      })
      .select({slug:1, name:1})
    projectTests = unsortedProjectTests.sort( (a, b) => {
      return project.tests.indexOf(a.id) - project.tests.indexOf(b.id);
    });

    results = await Result.getResultsForUserTesting({ author: req.user._id, project: project._id });
    const arrayTests = projectTests.map(function(test) {return test.slug;});
    const arrayResults = results.map(function(result) {return result.taskslug;});
    const remainingArray = arrayTests.filter(function(test) {return !arrayResults.includes(test)});
    if(remainingArray.length == 0 && req.user.level < 10){
      const recordedCode = req.user.participantHistory.filter(e => e.project_id.toString() == req.user.participantInProject.toString());
      if (recordedCode.length == 0){
        confirmationCode = uniqid();
        await User.findOneAndUpdate({
          _id: req.user._id
        }, {
          $push: {
            participantHistory:
              {
                project_id: project._id,
                project_name: project.name,
                individual_code: confirmationCode,
              }
            },
          $push: {
            participant_projects: project._id
          }
        }, {
          new: true
        }).exec();
      } else {
        confirmationCode = req.user.participantHistory.filter(e => e.project_id.toString() == req.user.participantInProject.toString())[0].individual_code;
      }
    };
  };
  res.render('testing', {project, projects, results, study, confirmationCode, projectTests});
};

//run the test for a particular user
exports.runTest = async (req, res) => {
  const test = await Test.findOne({ slug: req.params.slug });
  const feature = {
    slug: req.params.slug,
    language: req.params.lang || req.user.language,
    project: req.user.participantInProject || req.user.project._id
  };
  const parameters = await Param.getParameters(feature);
  let params = '';
  if(parameters){
    if(parameters[0]){
      if (parameters[0].parameters){
      params = parameters[0].parameters;
      }
    }
  }
  if(typeof(test.file) == 'undefined'){
    req.flash('error', `${res.locals.layout.flash_no_experiment_file}`);
    res.redirect('back');
  } else {
    res.render('runTest', { title: test.name, test, params});
  }
};

exports.listPublicTests = async(req, res) => {
  const page = req.params.page || 1;
  const limit = 18;
  const skip = (page * limit) - limit;
  const testsPromise = Test
    .find({
      open: true,
      author: { $exists: true }
    },{
      name: 1, slug: 1, description: 1, author: 1, photo: 1, open: 1,
    })
    .skip(skip)
    .limit(limit);
  const countPromise = Test.where({open: true, author: { $exists: true }}).countDocuments();
  const [tests, count] = await Promise.all([ testsPromise, countPromise ]);
  const pages = Math.ceil(count / limit);
  if(!tests.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/listing/page/${pages}`);
    return;
  }
  res.render('listing', {tests, page, pages, count});
};

exports.showAllTasksForAdmin = async (req, res) => {
  const tests = await Test
    .find({ },{
      name: 1, slug: 1, description: 1, author: 1, photo: 1, open: 1, created: 1, scriptUpdated: 1, production: 1, labjsVersion: 1
    })
  res.render('alltestsforadmin', {tests});
};
