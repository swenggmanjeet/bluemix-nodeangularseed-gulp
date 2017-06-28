module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'app/js/site/**/*.js',
      'test/**/*.spec.js'
    ]
  });
};