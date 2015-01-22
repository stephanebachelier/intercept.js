module.exports = {
  options: {
    data: {
      version: '<%= version %>'
    }
  },
  interception: {
    src: '<%= preprocess.interception.dest %>',
    dest: '<%= preprocess.interception.dest %>'
  }
};
