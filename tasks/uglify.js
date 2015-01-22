module.exports = {
  options: {
    banner: '<%= banner %>'
  },
  dist: {
    src: '<%= concat.dist.dest %>',
    dest: 'dist/intercept.min.js',
    options: {
      sourceMap: true
    }
  }
};
