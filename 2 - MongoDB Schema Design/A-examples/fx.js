module.exports = function() {
  return {
    USD: 1,
    CRC: 0.001785714286
  };
};

/*

Your product schema supports different currencies.
Products can list their price in either US dollars,
euro dollars, or British pound sterling.
You may be wondering, how will you
be able to ensure a consistent sort order when products
have different currencies?
For instance, 95 euros would be less than $100 in March, 2015.
However, as the euro rebounded against the dollar,
95 euros would be more than 100 US dollars in May, 2015.
Your REST API will be able to account for these differences
and ensure that products are sorted using a recent exchange
rate.
How will the REST API do this?
By utilizing the store what you query form principle.
In order to ensure consistency when
sorting by price, what you want is a numeric field
that represents the price of the product in a fixed currency.
This approximatePriceUSD field will represent the product's
price in US dollars.
With Mongoose and a set of exchange rates,
you'll be able to keep the product's price in sync
with the product's price in USD, which will enable you
to sort by price effectively.
The Mongoose feature that will enable you to do this
is custom setters.
With custom setters you can tell Mongoose
to perform certain operations every time
the value of a certain field is set.
In this case, every time somebody
sets the price dot amount field, Mongoose
executes this function.
In this case, this function updates
the internal.approximatePriceUSD property
to reflect the changes in the price dot amount.
The way your schema computes the internal.approximatePriceUSD
field is by taking the provided price
and dividing it by the exchange rate defined
by this fx function.
The custom setter for price stock currency
works in a similar way, only it uses
the newly set currency and the current value of price dot
amount.
The exchange rate is pulled from this fx function.
And the fx function is required in from a file called fx dot
js.
Let's take a look at what fx dot js looks like.
As you can see, this fx file exports a function
that returns some hard coded exchange rates that
are reasonable approximations.
In the REST API chapter, you will make this dynamic.
But for this example, the hard coded rates are sufficient.
Now, that you've seen how the fx function works,
let's see this custom setter in action.
In this example, you create a new product,
much like in previous examples.
Then you can start manipulating the price in currency
and see what happens to the internal.approximatePriceUSD
field.
Initially, price dot amount is 5 and price dot currency is USD.
That means that internal.approximatePriceUSD
is initially 5.
When you change price dot amount to 88,
internal.approximatePriceUSD gets updated to 88 as well.
Now, when you do something tricky
and change the currency to euros,
internal.approximatePriceUSD gets updated to 80,
which is 88 divided by 1.1, which is the exchange
rate defined in fx dot js.
After that, when you change the price dot amount to 11,
internal.approximatePriceUSD becomes
10, which is 11 divided by 1.1.
The power of custom setters is that you
don't have to do anything special in the code that
uses the product schema.
You don't have to call any functions
or even be aware of the fact that
internal.approximatePriceUSD is changing.
The Mongoose schema abstracts away
that layer of business logic.
So all you're doing is setting properties,
and Mongoose takes care of the rest.
 */