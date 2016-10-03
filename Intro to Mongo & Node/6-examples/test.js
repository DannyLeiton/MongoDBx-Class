/*
Now, in order to run this test.js file,
Mocha has an executable that's installed in node_modules/.bin.
You can use this node_modules/.bin/mocha command

node_modules/.bin/mocha test.js

For instance, specifying -g fail to the Mocha executable
will only run this it fails gracefully test.
Similarly, specifying -g other will
run only the tests that are under this my other feature
describe block, this particular describe call.

grep: a Unix command used to search files for the 
occurrence of a string of characters that matches 
a specified pattern.

node_modules/.bin/mocha -g "fail" test.js

node_modules/.bin/mocha -g "other" test.js

Mocha also has the ability to use different reporters
for test output.
Reporters control the format that your test results
are output in.
By default, Mocha uses the spec reporter.
However, Mocha has several other built-in reporters.
For instance, the dot reporter outputs a very concise format
using only dots, which is handy for situations
when you have thousands of tests.

node_modules/.bin/mocha -R dot test.js

There's also this x unit format, which
outputs test results in the standard execute in XML format.

node_modules/.bin/mocha -R xunit test.js

Finally, my personal favorite built-in Mocha reported
is the nyan cat reporter, which outputs a happy little Ascii
kitten when all your tests succeed.

node_modules/.bin/mocha -R nyan test.js

*/

var assert = require('assert');

describe('my feature', function() {
  it('works', function() {
    assert.equal('A', 'A');
  });

  it('fails gracefully', function() {
    assert.throws(function() {
      throw 'Error!';
    });
  });
});

describe('my other feature', function() {
  it('async', function(done) {
    setTimeout(function() {
      done();
    }, 25);
  });
});