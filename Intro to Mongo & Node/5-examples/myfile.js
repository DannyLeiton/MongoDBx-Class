/* All myfile.js does is assign a function
to this module.exports property.
Now, you can think of module.exports as the return
value that somebody gets when they call require on the file.
*/

module.exports = function() {
  console.log('Hello from myfile.js');
};