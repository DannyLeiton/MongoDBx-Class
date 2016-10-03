setTimeout(function() {
  console.log('In timeout!');
}, 3000); //wait 3 seconds.

console.log('Not in timeout');

/*
To see the event loop in action, you should asked yourself,
what would the following program print out?
If you said not in timeout will print before in timeout,
you're right.
This is because set timeout registers an event handler
which gets called on the next iteration of the event loop,
whereas the not in timeout statement gets
printed in the current iteration of the event loop.
Typically code that executes in the current iteration
of the event loop and thus blocks the event loop,
like this first log statement, is known as synchronous code,
whereas code that registers an event handler
and thus doesn't block the event loop
is known as asynchronous code.
In Node.js, file I/O and network I/O are typically asynchronous.
In particular, you will notice that every MongoDB operation
that you'll use in this course uses callbacks, and is thus
asynchronous.
This enables Node.js to be highly concurrent by default.
You don't have to worry about setting up multiple threads
to make sure you're not blocking the CPU waiting on a database
operation.
Many Node.js developers find callbacks to be cumbersome.
There are numerous MPM packages that provide syntactic sugar
on top of callbacks, such as async and the various promises
libraries.
However, callbacks are handy for determining
if your code is doing too much I/O. If you have
12 levels of nested callbacks, the problem is probably
not the callbacks, but that you have a very complex function
that's very difficult to test.
*/
