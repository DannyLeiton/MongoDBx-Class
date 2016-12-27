var app = require('./server');
var assert = require('assert');
var superagent = require('superagent');

describe('server', function() {
  var server;

  beforeEach(function() {
    server = app().listen(3005);
  });

  afterEach(function() {
    server.close();
  });

  it('prints out "Hello, world" when user goes to /', function(done) {
    superagent.get('http://localhost:3005/', function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.text, "Hello, world!");
      done();
    });
  });
});

/*
In addition to node.js' great testing and workflow tools,
the asynchronous nature of node.js
makes testing very easy.
In this course, you will learn to take advantage of node.js
to get fast feedback on your development process.
In particular, in this lesson, you
will learn to write tests that interact with your rest API,
in the same way your AngularJS and ionic code will
in later chapters.
This is the same server.js file that you
saw in the express HTTP server lesson.
It exports a function that returns an express app.
Thanks to node.js' asynchronous IO, you
can use this function to start a server in your Mocha test code,
and make HTTP requests against your live server.
Here's the actual Mocha test code.
Now, this may seem counter-intuitive
if your background is in a language like C++ or Java,
but the nature of event driven IO makes it possible to start
an HTTP server, and make HTTP requests to that same server
in the same thread.
So this superagent module is a popular node.js HTTP client.
You can use superagent to make HTTP requests.
For instance superagent exposes this nice dot get function.
You could use the dot get function
to make an HTTP request with the verb get to localhost: 3000
and get the response back in this nice little res parameter.
Now in this particular example, what this test does is,
before the test starts you create
a new server using the call to your server.js file.
Once you have the server, you listen on port 3,000,
and then your test makes an HTTP request to localhost:3000.
The same server that you started here.
Once it gets the response back, it
asserts that you got back the text hello world.
This test also asserts on the HTTP response status.
HTTP responses include a numeric status
that describe the high level semantics of the response.
For instance, if the response succeeded or failed.
You may have heard of the HTTP status
404, which means not found.
In this case the HTTP status 200,
means that the response was processed successfully.
Express returns HTTP status 200 by default.
Finally, one last detail.
See this function done right here?
Since JavaScript is asynchronous,
Mocha supports asynchronous tests.
Mocha inspects the parameters of the function
you pass to the it function.
If the function takes an argument,
Mocha assumes that this test is asynchronous, and calling done
is how you tell Mocha that your test is in fact completed.
Now in case you have doubts, let's run this test
and see that it really works.
As you can see all the tests pass.
Now let's tweak the server so the tests fail.
Let's make it so that the server prints out
hola mundo rather than hello world, and rerun the tests.
So here's the new slash route.
And when you rerun the tests, you
get back this nice handy output that
says that you expected the server to return hello world,
and it gave you back hola mundo.
So now thanks to the power of event driven IO,
you have the ability to start an HTTP server,
as well as test it.
Later in this chapter, you will use this paradigm with Gulp
to write tests for your rest API.
So why is testing your rest API so important?
Besides the obvious reason that we
want to make sure this course's code examples work,
testing is an important investment
in your code base's future.
A single test eliminates the possibility of one or more bugs
creeping into your system.
A thorough suite of tests can ensure that your code doesn't
break in any obvious ways.
*/
