var mongoose = require('mongoose');
var productSchema = require('./product');

var Product = mongoose.model('Product', productSchema);

var p = new Product({
  _id: 'P1',
  name: 'test',
  price: {
    amount: 5,
    currency: 'USD'
  },
  category: {
    name: 'test'
  }
});

console.log(p.displayPrice); // "$5"

p.price.amount = 20;
console.log(p.displayPrice); // "$20"

// { ... "displayPrice": "$20", ... }
console.log(JSON.stringify(p));

var obj = p.toObject();
console.log(obj.displayPrice); // "$20"

// { ... "displayPrice": "$20", ... }
console.log(JSON.stringify(obj));

/*
 * Mongoose has numerous handy features
that make it an indispensable tool for web development
to Node.js.
Virtuals are one such feature.
Virtuals are properties that are typically
computed from other properties.
They are not persisted to the database,
but they can be accessed just like any other property.
Displaying the price of a product
is a good example of where virtuals shine.
Displaying a price as, say, 25 USD
is not a very good choice for user experience.
25 preceded by a dollar sign is a more professional
looking choice.
To declare a virtual you use this virtual function
on your schema.
You can then declare a getter function that tells Mongoose
how to compute this property.
In this case, the getter function
converts the currency into a symbol
and then concatenates the numeric price.
You could achieve the same effect with a helper function.
However, virtuals have some nice properties
that make them a more convenient choice than helper functions.
First of all, the display price virtual
will be exposed as a plain old property on product documents.
There's no need for any actual function calls.
Secondly, notice these two object toObject and toJSON
properties that you're setting on your schema.
The toObject and toJSON functions
are Mongoose's methods for converting a Mongoose document
into a plain old JavaScript object.
The difference between these two functions
is that JavaScript's built in JSON.stringify, function which
converts a JavaScript object into JSON string,
first looks for a toJSON function on the object
and then uses that output.
Now, by default, toObject and toJSON do not include virtuals.
But if you set this virtual true property
on toObject and toJSON, your schema
will be configured to include virtuals in the toObject
and toJSON outputs.
This means that calling JSON.stringify on a product
document will produce string output that includes
this display price virtual.
In addition, the JavaScript object returned by toObject
will also include the display price property.
Let's see what the output of the JSON.stringify function
looks like when you call it with the product object.
As you can see, the output includes this display price
virtual.
This is very useful when you go through the rest API chapter
because this will enable your rest
API to send computed virtuals along with your documents
to the angular JS client.  
 * 
 */
