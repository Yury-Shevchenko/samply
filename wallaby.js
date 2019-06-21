module.exports = function () {
  return {
    files: [
      'lib/**/*.js'
    ],

    tests: [
      'test/**/*Spec.js'
    ],

    env: {
      type: 'node'
    }
  };
};
