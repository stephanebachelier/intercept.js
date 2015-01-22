module.exports = {
  options: {
    banner: '<%= banner %>'
  },
  dist: {
    src: '<%= concat.dist.dest %>',
    dest: 'dist/intercep.min.js',
    options: {
      sourceMap: true
    }
  }
};
