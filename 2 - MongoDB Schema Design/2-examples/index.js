var mongoose = require('mongoose');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/test');

// Parameters are: model name, schema, collection name
var User = mongoose.model('User', schema, 'users');

var user = new User({
  name: 'John Smith',
  email: 'john@smith.io'
});

user.save(function(error) {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  User.find({ email: 'john@smith.io' }, function(error, docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    console.log(require('util').inspect(docs));
    process.exit(0);
  });
});

/*
MongoDB is schemaless.
You can store whatever documents you
want in whatever collection.
However, just because you can store
any document doesn't mean that you should.
In order to get good performance and developer productivity
from MongoDB, you should think carefully
about your schema design.
The first schema design principle you will learn about
is the result of these three MongoDB characteristics.
MongoDB can update documents in place very quickly as long
as the document size doesn't change too much,
and MongoDB is optimized for fast queries
on individual documents.
However, MongoDB has no notion of joins.
There's no way to reliably merge data from different collections
like you would with joins in SQL databases.
For instance, suppose you have a collection of users
and a collection of reviews.
Each review tracks which user posted it.
In order to get a user and their corresponding reviews,
you would have to run two queries, one for the user
and one for each of their reviews.
There's no way to do this with one query and MongoDB
unless you change the schema.
Furthermore, there is no way to sort users
by their average review score in MongoDB with this schema.
You would have to pre-compute the average review score
and store in the User Documents if you want to sort by it.
In order to take advantage of MongoDB strengths,
you should remember that your MongoDB schemas should closely
match the data you want to display to the end user.
For instance, if you want to display the average review
score for a user, you should track the average review score
in the user document rather than re-computing it
every time you load a user by loading each
and every individual review.
A helpful mnemonic for remembering this principle
is Store What You Query For.
This may seem counterintuitive if you
are used to SQL databases, because this is definitely
not their normal form.
However, storing exactly what you query for
is easier to understand, reason about, and de-bug,
because there's less data transformation
between the client and the database.
It's also better for performance,
because reading a single MongoDB document
requires fewer different non-sequential hard drive reads
than executing an SQL query with multiple joins.
In other words, MongoDB's lack of joins
may seem intimidating to developers
from a SQL background, however, to paraphrase
Linux's original architect, Linus Torvalds,
if you have an API endpoint with multiple joins,
you're screwed anyway and should fix your API.
As you'll see when you design the API for your retail app,
each API endpoint will be primarily
responsible for loading data from a single collection.
 */