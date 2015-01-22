module.exports = {
  options: {
    banner: '<%= banner %>'
  },
  dist: {
    src: '<%= concat.dist.dest %>',
    dest: 'dist/interception.min.js',
    options: {
      sourceMap: true
    }
  }
};
