var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('browserify', function() {
  return gulp.
    src('./index.js').
    pipe(browserify()).
    pipe(gulp.dest('./bin'));
});

gulp.task('watch', function() {
  gulp.watch(['./*.js'], ['browserify']);
});


/*
Now, recompiling using Browserify from the command
line every time is a pain.
So Node.js developers typically automate this process
using Gulp.
This is why Gulp is typically called
a build system, rather than a test runner, which
is what you've used Gulp for so far in this course.
The gulp-browserify package is a plug-in for Gulp
that runs Browserify for you.
 */