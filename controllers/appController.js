const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');//make unique identifier
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const slug = require('slugs');
const Project = mongoose.model('Project');

exports.researcherPage = async (req, res) => {
  res.render('researcher', {action: req.params.action});
};

exports.participantPage = async (req, res) => {
  res.render('participant', {action: req.params.action});
};

exports.docs = (req, res) => {
  res.render('docs', {page: req.params.page || 'intro'});
};

exports.forgot = async (req, res) => {
  res.render('login', {title: 'Welcome', forgot: true});
};

exports.testing = async (req, res) => {
  const study = req.query.study;
  const project = await Project.findOne({ _id: req.user.participantInProject || req.user.project._id },{
    name: 1, showCompletionCode: 1, welcomeMessage: 1, useNotifications: 1, tests: 1,
  });
  const projects = await Project.getCurrentProjects();
  res.render('testing', {project, projects, study});
};
