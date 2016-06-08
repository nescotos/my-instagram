var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var validator = require('node-mongoose-validator');

var userSchema = new Schema({
  email : {type: String, required: true, index: {unique: true}},
  name : {type: String, required: true},
  username : {type: String, required: true, index: {unique: true}},
  password : {type: String, required: true, select: false },
  //DON'T DO THIS IF YOU HAVE A LOT OF DATA EMBEDDED IN THE ARRAY!!!
  followers : [{type: Schema.Types.ObjectId, ref : 'User'}],
  following : [{type: Schema.Types.ObjectId, ref : 'User'}],
  //Photos String
  photos : [{type: Schema.Types.ObjectId, ref : 'Photos'}]
});

//Hashing the password before the user is saved
userSchema.pre('save', function(next) {
	var user = this;
	//Hashing the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();
	//Generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);
		//Change the password to the hashed version
		user.password = hash;
		next();
	});
});
//Validations
userSchema.path('email').validate(validator.isEmail(), 'Please provide a valid email address');
//Method to compare a given password with the database hash
userSchema.methods.comparePassword = function(password) {
	var user = this;
	return bcrypt.compareSync(password, user.password);
};

userSchema.index({ username : 'text' });
userSchema.index({ name : 'text' });
module.exports = mongoose.model('User', userSchema);
