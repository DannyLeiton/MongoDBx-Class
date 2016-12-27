var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }]
  }
});

/*
The third and final schema that you
will use in the retail application is the user schema.
This schema defines the data that you'll
store about individual users.
The user document will contain the user's username,
their profile picture, their Facebook oauth ID, and the list
of products in their cart.
The Facebook oauth ID is the string
that will serve as a unique identifier for this user's
Facebook account.
This will allow your users to log in with Facebook.
User and product have a many-to-may relationship.
A product can be in many carts, and the user
can have multiple products in their cart.
Users will typically have a small number
of items in their car.
But hopefully, your retail site will
have millions of users buying millions of products,
so a single product may be in thousands of carts
at the same time.
By the principle of least cardinality,
as long as you assume that a user isn't
likely to have more than 5 to 10 products in their cart,
you can embed the list of product IDs in the cart
sub documents.
The user schema is pretty simple,
but it introduces one key concept about MongoDB access
control.
In the product and category schemas,
there was no sensitive information.
You don't want to hide a product's price from any user.
However, the user schema does have
some sensitive information.
In particular, you'd want to hide the user's cart
because you don't want users to be able to see what
other users are about to buy.
You also want to hide the user's oauth ID, which
will link the user's account to their Facebook profile.
Unlike SQL databases, MongDB doesn't
have any built-in notion of access control.
That is there's no way to tell MongoDB
that only this user has access to these fields
in this collection.
However, the ability to nest documents in other documents
provides your application an intuitive way
to implement access control.
MongDB queries have a notion of a projection,
which enables you to hide fields from the output of a query.
So when you do find one without any parameters,
you get back the whole document.
But when you do findOne with no criteria,
but a projection that says to exclude the data of sub
document, you get back a document
that excludes this data sub document.
Thus your application can use projections to make sure
publicly facing code doesn't show a user's cart or oauth ID.
*/
