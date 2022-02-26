const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	firstname: {
		type: String,
		required: true,
		trim: true
	},
	lastname: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		validate: function(value) {
			passwordRegex = /^[A-Za-z0-9#$&_]+$/;
			return passwordRegex.test(value);
		}
	},
	email: {
		type: String,
		required: true,
		validate: function(value) {
			var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			return emailRegex.test(value);
		}
	},
	type: {
		type: String,
		required: true,
		enum: [ 'admin', 'customer' ],
		lowercase: true
	}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
