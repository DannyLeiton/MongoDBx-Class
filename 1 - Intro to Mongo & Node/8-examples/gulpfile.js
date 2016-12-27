var gulp = require('gulp');
var mocha = require('gulp-mocha');


/*
So in this example, gulpfile, you have two tasks.
The first is this test task.
This task takes this test.js file and pipes it
into the Mocha plug-in and catches any errors.

./node_modules/.bin/gulp test
*/
gulp.task('test', function() {
  gulp.
    src('./test.js').
    pipe(mocha()).
    on('error', function(err) {
      this.emit('end');
    });
});


/*
So far though, the only thing that introducing Gulp has done
is make your test command longer.
The real magic is in the other Gulp task.
The Watch task uses the gulp.watch function,
which watches the specified files for changes
and executes the corresponding tasks.
In this case, the Watch task watches every js file
in the current directory and re-runs the test task
when any of the files change.
Now, in order to make Gulp easier to run,
let's add a Watch script package, dot JSON, that
will run Gulp Watch for you.
And now when you run npm run watch, Gulp Watch will start,
and Gulp will start watching the file system for changes.

npm run watch
*/
gulp.task('watch', function() {
  gulp.watch('./*.js', ['test']);
});


