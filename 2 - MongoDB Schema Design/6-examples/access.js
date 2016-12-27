var mongoose = require('mongoose');
var productSchema = require('./user');

var User = mongoose.model('User', productSchema);

var u = new User({
  profile: { username: 'dleiton' }
});

modifyUserProfile(u, {
  picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
});

// modifyUserData can **only** modify
// user.profile, not user.data
function modifyUserProfile(user, profile, callback) {
  user.profile = profile;
  user.save(function(error, user) {
    // handle result
  });
}

/*
Conversely, there are some fields
you want to prevent your user from editing.
For instance, you never want your user
to mistakenly edit their oauth ID.
That could break their log-in functionality.
The preferred way to achieve this with the MEAN stack
is also through sub-documents.
For instance, suppose you had a function called Modify User
Profile.
Suppose this function, you only wanted
to use it to modify the user's profile.
It should not touch the user's oauth ID or a cart.
You can achieve this by only assigning to the profile
sub-document, as shown.
There is no way that the user can use this modify user
profile function to modify the oauth ID or the cart.
However, if you were to add fields to the profile,
say, a job title field, then this modify user profile
function would have to change.
 */
