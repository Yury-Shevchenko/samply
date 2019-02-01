const mongoose = require('mongoose');
const Agenda = require('agenda');
const Agendash = require('agendash');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.log('You are on an older version of node. Please go to nodejs.org and download version 7.6 or greater.');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to Database and handle bad connections
//mongoose.connect(process.env.DATABASE, {useNewUrlParser: true } );
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//import all models
require('./models/Test');
require('./models/User');
require('./models/Result');
require('./models/Param');
require('./models/Project');
require('./models/Job');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
