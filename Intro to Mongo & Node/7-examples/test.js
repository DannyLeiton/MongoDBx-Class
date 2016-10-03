/*
npm test
npm run test
npm run test-kitten

npm help
npm test --help

For instance, npm install mocha dash g
will enable you to access Mocha from the Command line.
Installing Mocha with dash g enables
you to run mocha test dot js rather
than using node module slash dot bin slash mocha
from the Command line, which is more concise.
However, the downside of relying on executables installed
via dash g is that all node projects on your machine
must be compatible with the globally installed version
of Mocha.
Older projects may assume Mocha 1 dot x.
They may not work with Mocha version 2.2.4.
Furthermore, package dot JSON provides you
no way of declaring that a module requires
a certain globally installed version of Mocha, which breaks
the implicit contract that npm Install is
sufficient to at least run the module's tests.
Therefore, it is preferable to use
locally installed dependencies and use the npm Run
command rather than asking users to use npm install dash g.

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