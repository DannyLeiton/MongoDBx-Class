var mongoose = require('mongoose');
var Category = require('./category');

var productSchema = {
  name: { 
    type: String, 
    required: true 
  },
  // Pictures must start with "http://"
  pictures: [{ type: String, match: /^http:\/\//i }],
  price: {
    amount: { 
      type: Number, 
      required: true
    },
    // Only 2 supported currencies for now
    currency: {
      type: String,
      enum: ['CRC','USD'],
      required: true
    }
  },
  /*
    Category is a separate collection,
    but because you care about querying for products
    by category, you should inline category
    for optimal query performance, especially
    since there is a one-to-many relationship of categories
    to products.

    A product's category isn't going to change often.
    You will probably only change the product's category
    as part of an expensive database migration.
    But you will Inquiry by category often,
    which is why inlining category is
    a good idea in this case and thus an instance of store what
    you query for.
   */
  category: Category.categorySchema
};

module.exports = new mongoose.Schema(productSchema);
module.exports.productSchema = productSchema;