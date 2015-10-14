/*******************************
          Build Task
*******************************/

var
  gulp         = require('gulp'),

  // gulp dependencies
  chmod        = require('gulp-copy'),
  gulpif       = require('gulp-if'),

  // config
  config       = require('../config/user'),
  tasks        = require('../config/tasks'),

  // shorthand
  globs        = config.globs,
  output       = config.paths.output,
  source       = config.paths.source,
  released     = config.paths.assets,

  log          = tasks.log
;

module.exports = function(callback) {

  console.info('Building assets');

  // copy assets
  return gulp.src(source.themes + '/**/assets/**/*.*')
    .pipe(gulpif(config.hasPermission, chmod(config.permission)))
    .pipe(gulp.dest(output.themes))
  ;

};