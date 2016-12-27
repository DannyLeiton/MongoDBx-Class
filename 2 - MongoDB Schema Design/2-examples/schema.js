var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true
  },
  loggedInCount: {
    type: Number,
    default: 0
  }
});

/*
Mongoose provides features like schema validation,
pseudo joins, and numerous other features
on top of the MongoDB node.js driver.
These features are key for web development.
Mongoose's API consists of four primary data types.
A schema is a set of rules that defines
what fields a document may have and what
properties the document must satisfy to be considered valid.
A connection is an object representing
one or more sockets that are connected to the MongoDB
server.
At a high level, a model is a combination
of a schema and a connection.
A model is a wrapper around a single MongoDB collection
and uses its associated schema to make sure documents inserted
into the collection satisfy the schema's constraints.
Now a Mongoose document can be thought of as an instantiation
of a model.
A document is a single object from a collection.
It has an associated model and a dot save function
that you can use to persist that document to MongoDB.
Suppose you wanted your user documents to have three fields.
A name, an email address, and the number of times the user
has logged in.
This is how you would express these requirements in Mongoose.
The username is a string and is required,
email is of type string, also required,
and must match this particular regular expression.
And the logged in count is a number that defaults to zero.
Also, the user's email has this lowercase property.
This tells Mongoose to convert the email string
to lowercase before saving which enables
emails to be case insensitive.
In order to use this schema, you first
need to make Mongoose connect to MongoDB.
This mongoose.connect function is the most concise way
to make Mongoose connect to this mongod server.
Once you have called connect, you
can then use the mongoose.model function
to create a user model from the schema and collection.
The user model has several nice properties.
For instance, you can use the user model
to create a new user document with name John Smith and email
john@smith.io, and then you can save the document.
The user model also has this handy dot
find function which wraps the MongoDB node.js driver's
find function.
Note that the callback to find takes
an array of Mongoose documents.
Now once you run this script, you
should see that Mongoose creates this new user,
saves it to the database, and then successfully queries
for the user document again and prints it to the screen.
And now once you run this script you
see that Mongoose inserted the John Smith document for you
as well as set the logged in count to zero by default.
 */