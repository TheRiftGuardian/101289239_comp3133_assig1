const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
	listing_id: {
		type: String,
		required: true
	},
	listing_title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
		maxlength: 1000
	},
	street: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	postal_code: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	email: {
		type: String,
		required: true,
		validate: function(value) {
			var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			return emailRegex.test(value);
		}
	},
	username: {
		type: String,
		required: true
	}
});

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
