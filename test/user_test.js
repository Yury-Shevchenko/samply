const assert = require('assert');
const User = require('../models/User');
const mongoose = require('mongoose');

//Describe tests
describe('saving new user-researcher', function() {

  //create tests
  it("Saves a new user-researcher to the database", function(done) {

    var researcher = new User({
      name: 'test'
    });
    researcher.save().then( function() {
      assert(researcher.isNew === false);
      done();
    });

  });

});
