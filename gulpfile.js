// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');

// Get one .styl file and render
gulp.task('one', function () {
  gulp.src('./stylus/style.styl')
    .pipe(stylus({ use: nib(), compress: true}))
    .pipe(gulp.dest('./'));
});

// Default gulp task to run
gulp.task('default', ['one']);