var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

var productSchema = {
  name: { type: String, required: true },
  // Pictures must start with "http://"
  pictures: [{ type: String, match: /^http:\/\//i }],
  price: {
    amount: { 
      type: Number,
      required: true,
      set: function(v) {
        this.internal.approximatePriceUSD =
          v / (fx()[this.price.currency] || 1);
        return v;
      }
    },
    // Only 3 supported currencies for now
    currency: {
      type: String,
      enum: ['USD', 'CRC'],
      required: true,
      set: function(v) {
        this.internal.approximatePriceUSD =
          this.price.amount / (fx()[v] || 1);
        return v;
      }
    }
  },
  category: Category.categorySchema,
  internal: {
    approximatePriceUSD: Number
  }
};

var schema = new mongoose.Schema(productSchema);

var currencySymbols = {
  'USD': '$',
  'CRC': '₡'
};

/*/
/* Human-readable string form of price - "$25" rather
/* than "25 USD"
/*/
schema.virtual('displayPrice').get(function() {
  return currencySymbols[this.price.currency] +
    '' + this.price.amount;
});

schema.virtual('fixedDecimals').get(function() {
  var price = this.internal.approximatePriceUSD;
  return currencySymbols[this.price.currency] +
    '' + price.toFixed(2);
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.productSchema = productSchema;