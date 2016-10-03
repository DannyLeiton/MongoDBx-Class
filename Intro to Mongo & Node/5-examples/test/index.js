/*
The require function is Node.js's mechanism
for breaking up large projects into small, manageable files.
The require function lets you include
functions from external modules and other files
in a clean and elegant way.
*/
exports.other = require('./myotherfile');
/*
First, notice that this file uses exports.other
instead of module.exports.
The exports variable is a convenient shorthand
for module.exports.
This file would do the same thing
if you used module.exports.other,
rather than exports.other.
The only difference is that you can't directly
assign to the exports variable.
*/