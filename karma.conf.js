module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'app/js/**/*.js',
      'test/**/*.spec.js'
    ]
  });
};