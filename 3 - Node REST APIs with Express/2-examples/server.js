var express = require('express');

module.exports = function() {
  var app = express();

  app.get('/', function(req, res) {
    res.send('Hello, world!');
  });

  app.get('/user/:user', function(req, res) {
    res.send('Page for user ' + req.params.user + ' with option ' +
      req.query.option);
  });

  return app;
};

/**
 * REST API
 * 
 * So far in this course you've written Node.js code
that interacts with MongoDB.
The part of the stack that you've interacted with
is the bottom part of the MEAN stack, the Node.js
and the MongoDB part.
The code you've written thus far is of limited use
because you haven't addressed the key question of how
Angular JS and Ionic will interact with the Mongoose
schemas that you've designed.
At a high level, a REST API is an interface
for client-side JavaScript running
in, say, Google Chrome or an Ionic Framework mobile app
to read data from and store data to your server.
REST, which stands for Representational State
Transfer, is a paradigm for a browser
to communicate with a server over HTTP, which
is short for Hypertext Transfer Protocol,
also known as that thing that loads Google's home page
so you can search for pictures of kittens.
When you load Google's home page,
Chrome sends an HTTP request to Google's servers,
and Google sends back an HTTP response,
which contains the HTML that instructs the browser how
to render the Google logo and search bar.
Modern browsers enable JavaScript
to send off new HTTP requests.
For the purposes of this course, you
could think of an HTTP request as a combination
of three distinct things.
The first is a verb, like GET, as shown here.
The second is a resource like slash home.
This is roughly analogous to a file path.
And the third is the optional JSON data known as the body.
Your Node.js server then sends an HTTP response in response
to the HTTP request.
An HTTP response can be thought of as a numeric response status
and associated JSON data.
You see the associated JSON data in this example.
The response status tells you at a high level
whether the corresponding request succeeded or failed,
and the JSON data is up for the client
to determine how to present.
The REST paradigm uses HTTP to manage state,
using so-called CRUD operations, which is short for Create,
Read, Update, Delete.
An HTTP Request with verb POST corresponds
to a create operation.
So the HTTP request shown here asks the server
to create a new user, and then the server
returns the ID of the newly created user.
Now if you were to send another HTTP request asking the server
to get slash user slash 42, which tells the server
to get the user with ID 42, you will get back
the newly created user in the HTTP response.
As you might have guessed, the HTTP verb GET
corresponds to a read operation in the CRUD acronym.
Post slash user and get slash user slash
colon ID are commonly known as routes or endpoints for short.
The goal of the rest of this chapter
is to build the REST API using Node.js
on top of the Mongoose schemas you wrote in the Mongoose
schema chapter.
This REST API will expose endpoints
that enable your client side JavaScript to create and load
users, products, and categories.
 * 
 */