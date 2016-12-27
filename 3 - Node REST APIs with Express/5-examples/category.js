var mongoose = require('mongoose');

var categorySchema = {
  _id: { type: String },
  parent: {
    type: String,
    ref: 'Category'
  },
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
};

module.exports = new mongoose.Schema(categorySchema);
module.exports.categorySchema = categorySchema;

/**
 * Now that you've learned the basics of how to use mocha
to test a web server and how to organize your code
using dependency injection, it's time
to tie it all together to build and test
the rest API for categories.
This API will provide two endpoints,
one to load categories by their underscore ID and one
to load categories by their parent category.
That is, when you visit this /api/v1/category
/parent/electronics route, your Node.js server will translate
this into a query to MongoDB for all categories with parent
equal to Electronics.
And then it will return the results as JSON.
Brace yourself, there's a fair amount of code in this section.
You should pay close attention, as the section will introduce
a couple of key concepts that you
will see in subsequent lessons.
In this example, there are six files.
The first file we'll take a look at is the category.js file.
This category.js file is the same category schema
that you saw in the schema design chapter.
As a reminder, it has an underscore ID,
a reference to the parent category, and a reference
to all of the ancestor categories.
Next, let's take a look at the package.json file.
The package.json file contains seven dependencies.
You have seen all of these dependencies
in previous lessons except for this http-status package.
Http-status has a map of readable strings
to HTTP status codes.
So instead of writing 404, you just write status.notfound.
Now, seven external dependencies for this simple example
may seem a bit crazy at first, but experienced
Node.js developers know how to take advantage
of npm's rich ecosystem.
The npm ecosystem has a solution for just about every problem.
And experienced Node.js developers
understand the benefits of including a package
versus writing it yourself.
For instance, Atom, which is GitHub's Node.js-based text
editor that was used to write all of the code for this
course, has nearly 150 npm dependencies.
Now let's take a look at this api.js file.
As you can see, this is where the http-status module is used.
And instead of putting say, 404, we
use status.notfound, which is the same thing as 404.
HTTP status makes code easier to read because even seasoned web
developers sometimes forget whether the forbidden HTTP
status is 403 or 401 or 4-0-something else.
Now, before we really dive into the api.js file,
let's take a look at index.js first.
The index.js file is the entry point
for running your web application.
To bootstrap the application, it uses the api.js file,
and then starts an HTTP server on port 3000.
Let's take a look at this models.js file,
which the index.js file uses to bootstrap your Mongoose models.
So the models.js file handles everything
you need to set up Mongoose and the category model.
In particular, it connects to a MongoDB,
creates a Mongoose model by including the schema,
and registers the category service with Wagner.
Next, let's take a look how index.js uses the api.js file.
As you can see, it uses this app.use function
that you haven't seen before.
The full semantics of app.use are pretty complex,
but for now, you're going to use it for Express subrouter
functionality.
In other words, the api.js function
is going to return an Express subrouter.
And the express app will know to defer to this subrouter every
time somebody visits a URL that starts with /api/v1.
So here's the api.js file.
It's the largest file you've seen so far, but don't worry,
there's not very many new concepts here.
First thing you're going to do is create a new Express router.
And then at the end of the file, you're
going to return the Express router
so higher level apps can include the router using app.use.
There's two routes in this router.
This first route loads categories
by their underscore ID field.
For instance, if I pull up a browser and go
to localhost:3000/a pi/v1/category/id/electronics,
I'm going to get the details for the electronics category.
Not surprisingly, all this route handler does,
effectively, is take the category model
and find one category by its underscore ID
as provided in the route parameter.
If an error occurred, this route is
going to return an HTTP internal server error
and send back the error string as JSON.
If the query returned, no results,
you're going to send back a 404 not found
and a hard code error message.
And if the query succeeded, finally, you're
going to send back the category as JSON.
The second route is going to look up
categories whose parent is a given category-- slightly
simpler.
This is the route that's going to load categories
by their parent category.
For instance, once again, visiting /api/v1/category
/parent/electronics will load all categories whose parent
category is Electronics.
The route handler does a find on categories whose parent
matches the route parameter ID.
And it sorts them by their ID, so laptops
will come before phones.
If there's an error, once again, you're
going to send back an HTTP internal server error and JSON
containing the error.
Otherwise, you're going to return all
of the categories you found.
Now that you've seen how the category API works,
let's take a look at how to write automated tests for it.
The testing paradigm described earlier in this chapter
makes testing this API easy.
Now before your tests can run, you
need to start up an Express server that uses your rest API.
Thankfully you can use models.js and api.js
to set up everything necessary to start your rest API server.
And then use app.use to include the Express subrouter
from api.js in your Express app.
In addition, before you run each test,
you should make sure to delete all categories to make
sure each test has a clean copy of the database.
The first test is going to be a basic sanity
test for the route that gets categories by ID.
What it's going to do is use Mongoose
to create one category.
Then it's going to make an HTTP get request to localhost:3000/c
ategory/id/Electronics, where Electronics corresponds
to the category that you created.
Once it gets back this get request,
it asserts that the results succeeded
and that the resulting category has the ID Electronics.
The second test is going to do the same thing
for the route that gets categories
by their parent category.
It's going to create four categories, some of them
nested.
So in this case, you have one category Electronics and then
two categories, Phones and Laptops,
that are children of Electronics,
and then a category called Bacon.
Once you've created these categories,
you're going to use superagent to make an HTTP
request to a category parent Electronics.
And when you make this HTTP request,
you're going to assert that the results that you got back
are Laptops followed by Phones.
These are the two categories that we created,
that are children of the Electronics category.

 */