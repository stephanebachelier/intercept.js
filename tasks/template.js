module.exports = {
  options: {
    data: {
      version: '<%= version %>'
    }
  },
  intercept: {
    src: '<%= preprocess.intercept.dest %>',
    dest: '<%= preprocess.intercept.dest %>'
  }
};
