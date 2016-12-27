var server = require('./server');

server().listen(3005);
console.log('Server listening on port 3005!');

/*
EXPRESS

So far you have used Node.js to write to and query
from MongoDB.
In this lesson, you will take your first step
towards building a rest API and learn
how to start an HTTP server in Node.js.
The npm package you will be using to start an HTTP server
is called Express.
It's the most popular Node.js web server and web application
framework, with over two million downloads per month
at the time of this recording.
Express is fast, flexible, and highly customizable.
Now, Node.js has its own HTTP parser,
and you can write in an HTTP server in plain Node.js
without any external packages.
However, Express provides routing and other
high-level abstractions that are indispensable for modern web
development.
Starting an Express server is pretty easy.
The Express module, which is accessed here
via the require express call returns a function
that you can use to create an Express app.
You can then attach so-called routes to the app.
Routing is the term that describes
telling Express which code to run for which types of HTTP
requests.
For instance, you would want a different route handler
for when somebody does a get request
to your home page versus when someone does a host
request to create a new user.
For instance, in this file, whenever
somebody does a get on the slash route,
Express will send back a page that contains the plain text
"Hello, world."
You will see this in action later.
An Express route handler, like this function,
takes two parameters.
A request object commonly abbreviated req or req
and a response object, commonly abbreviated res or res.
The req object includes information
about the incoming request and the res object
includes utilities for crafting a response.
For instance, this res dot send function sends
a plain text HTTP response.
Now, let's take a look at the code that actually executes
this server dot js function.
The index dot js file is going to be
responsible for executing the function defined in the server
dot js file.
It calls require to include the function exported by server dot
js and then executes the server function
to get back an Express app.
This dot listen function will then bind the Express
app to port 3,000.
So what does this mean?
Well, when you run node index dot js,
you should see the following output--
server listening on port 3000.
Now that the server is running, you
should be able to see this output in a browser,
so let's pull up Chrome and see what happens.
So when I go to Google Chrome and go to http local host colon
3000, I see this nice friendly "Hello, world" message,
which is the result of this particular route handler
and this call to res dot send.
Note that this file includes another route,
this slash user route.
The colon in this route delimits a so-called route parameter.
Now, if you use the framework like Ruby on Rails,
Express's route parameters should look familiar.
This req dot params dot user property gives you
access to whatever string is in this colon user
portion of the URL.
For instance, if I navigate to slash user slash MongoDB,
I see the text page for user MongoDB with option empty.
So what's this option thing all about?
Well, let's take a look at server
dot js see how server dot js uses it.
So in server dot js, notice that we also use
this req dot query dot option.
This req dot query object contains
key value pairs representing the URL's query string.
The query string is effectively everything
that comes after the question mark in the URL.
For instance, if we go to slash user slash MongoDB and attach
question mark option equals test,
the req dot query object will contain a key option
with value string test.
And when you navigate to this URL,
you see that indeed the output has the user
MongoDB and the option test.
Now, you may wonder why you wrote two separate files
in this lesson when you could have simply written
a single file that looks like what you see here.
This server alt file does the exact same thing
as the index dot js file.
The reason for this is for easier testing, as you
will see in the testing lesson.

 */