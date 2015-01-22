module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  gruntfile: {
    src: ['Gruntfile.js', 'tasks/{,*/}*.js']
  },
  lib: {
    src: ['lib/interception.js']
  },
  test: {
    src: ['test/**/*.js']
  }
};
