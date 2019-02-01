const mongoose = require('mongoose');
const Param = mongoose.model('Param');

//save parameters of the task in the database
exports.postParameters = async (req, res) => {
  let param = await Param.findOne({project: req.user.project._id, test: req.params.task, language: req.params.lang, slug: req.params.slug});
  if(!param){
    const new_param = new Param({
      project: req.user.project._id,
      test: req.params.task,
      language:  req.params.lang,
      slug: req.params.slug,
      parameters: req.body,
    });
    await new_param.save();
  } else {
    const update_param = await Param.findOneAndUpdate({
      project: req.user.project._id,
      test: req.params.task,
      language:  req.params.lang,
      slug: req.params.slug
    }, { parameters: req.body }, {
      new: true
    }).exec();
  }
  req.flash('success', `${res.locals.layout.flash_param_update}`);
  res.redirect('back');
};

exports.deleteParameters = async (req, res) => {
  let param = await Param.findOne({ project: req.user.project._id, _id: req.params.id })
  if(!param){
    req.flash('error', `${res.locals.layout.flash_no_param_found}`);
    res.redirect('back');
  } else {
    await param.remove();
    req.flash('success', `${res.locals.layout.flash_param_update}`);
    res.redirect('/tasks');
  }
};
