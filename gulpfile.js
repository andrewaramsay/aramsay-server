'use strict';

const gulp = require(`gulp`);
const SimpleBuild = require(`simple-build`);
const Logger = SimpleBuild.Logger;

let simpleBuild = new SimpleBuild({
  logger: new Logger({ level: Logger.Levels.into })
}, gulp);

simpleBuild.taskGroups.lint(simpleBuild);



const gulpMocha = require('gulp-mocha');
gulp.task('test', function () {
  return gulp.src('./src/**/*.spec.js', { read: false })
    .pipe(gulpMocha({ reporter: 'spec' }));
});

gulp.task('test:watch', ['test'], function () {
  gulp.watch('./src/**/*.js', ['test']);
});
