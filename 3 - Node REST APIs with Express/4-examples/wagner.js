var express = require('express');
var mongoose = require('mongoose');
var wagner = require('wagner-core');

setupModels(mongoose, wagner);

var app = express();

setupApp(app, wagner);

app.listen(3005);
console.log('Listening on port 3005!');

function setupModels(mongoose, wagner) {
  mongoose.connect('mongodb://localhost:27017/test');

  var userSchema = new mongoose.Schema({
    name: String
  });
  var User = mongoose.model('User', userSchema);

  wagner.factory('User', function() {
    return User;
  });
}

function setupApp(app, wagner) {
  var routeHandler = wagner.invoke(function(User) {
    return function(req, res) {
      User.findOne({ _id: req.params.id }, function(error, user) {
        res.json({ user: user });
      });
    };
  });

  app.get('/user/:id', routeHandler);
}

/*
Dependency injection is a software engineering practice
that helps you break your code up into small,
easy to maintain, chunks.
The general idea of dependency injection
is to separate initialization code from business logic,
so your rest API route handlers never have to worry about say,
setting up Mongoose models.
As you'll see in the AngularJS chapter,
dependency injection is a key part of writing AngularJS code.
In this lesson, though, you will learn
about how to use dependency injection in your Node.js
server.
Again, the key principle of dependency injection
is to separate the construction and initialization
of dependencies from the code that uses these dependencies.
For instance, in this example, instead of using the Mongoose
model directly, this business logic function
takes the Mongoose model as a parameter.
Now why access the Mongoose model in this way?
First of all, since the function's dependencies are all
specified as parameters, it's easy to refactor
this whole function out into a separate file.
It's also easy to [? reinstrument ?]
the dependencies.
For instance, what if you want to use
a separate database for tests?
All you need to do is change the way
you initialize the user model.
Now let's take a look at what happens when you flatten out
the structure.
This doesn't look particularly bad,
but think about the work it takes to set up
this user model for use.
You need to get this MongoDB connection string,
need to connect to MongoDB, and you
need to bootstrap the Mongoose model.
In this limited example, this isn't much of a problem.
But as you add more models, start building functionality
out on top of your models, and start having different server
configurations, the complexity can quickly
spiral out of control.
Furthermore, if you want to manipulate your Mongoose models
for testing purposes, keeping code
that creates your models in the same place as the code that
uses your models makes it tricky to write tests.
Suppose you wanted to use a different MongoDB
model for testing or you wanted to insert
several documents into your database
before executing this code.
With this development paradigm, you'd
have a hard time taking advantage of the API level
testing paradigm you learned about in the web server testing
lesson.
Now dependency injection may sound good theory,
but what about when you want to add parameters
to your functions.
Suppose you wanted to have the myUserFunction depend
on another Mongoose model.
Now every place that calls myUserFunction
needs to add a new parameter to the function to call.
When you're calling this function in your code
as well as in your test, adding parameters quickly
becomes cumbersome.
This is why typically you'll use a framework
to handle dependency injection for you.
In this course, you'll be using and npm package
called Wagner, like the famous German opera composer.
Wagner has a rich feature set that
goes well beyond dependency injection
but for the purposes of this course you'll be using Wagner
as a dependency injector.
Wagner lets you register named factories which are
functions that return values.
These values are known as services.
If you're already familiar with the AngularJS's
dependency injector, Wagner's notion
of factories and services is similar.
In this case, you register a service called User which
corresponds to your user model.
Now that you've registered the user model as a service,
how do you access it?
Wagner has this handy function called invoke.
Wagner's invoke function behaves much
like AngularJS's invoke function.
It takes a function and executes it.
However, invoke also inspects the function's parameter list
and pulls in services that match the parameter names.
The function specified in this call to invoke
takes a single parameter called user.
Wagner looks for a service named User and calls the function
with the correct service.
Notice that this function [? passed ?] to invoke
returns a separate function that happens
to be an Express route handler.
You'll see this pattern a lot in the upcoming lessons.
Since you're calling the invoke here,
the route handler variable is actually
an Express route handler function, which you can then
pass to the app.get function.
However, in addition, this route handler
has this User model already in its scope.
This is known as a closure, because the route handler
closes over this User model.
The reason for this is so that the Express route handler
can use Mongoose models without having
to worry about setting them up or pulling them
from any sort of global state.
 */
