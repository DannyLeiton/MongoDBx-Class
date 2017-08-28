var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: String, ref: 'Course' }]
});

/* Returns the student's first name, which we will define
 * to be everything up to the first space in the student's name.
 * For instance, "William Bruce Bailey" -> "William" */
schema.virtual('firstName').get(function() {
  var firstName = '';
  for(var i = 0; i < this.name.length; i++){
    if(this.name[i] == " ")
      break;
    firstName += this.name[i];
  } 
  return firstName;
});

/* Returns the student's last name, which we will define
 * to be everything after the last space in the student's name.
 * For instance, "William Bruce Bailey" -> "Bailey" */
schema.virtual('lastName').get(function() {
  var reversedName = this.name.split("").reverse().join("");
  var lastName = '';
  for(var i = 0; i < reversedName.length; i++){
    if(reversedName[i] == " ")
      break;
    lastName += reversedName[i];
  }  
  return lastName.split("").reverse().join("");
});

module.exports = schema;
