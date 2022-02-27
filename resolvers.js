const User = require('./models/User');
const Booking = require('./models/Booking');
const Listing = require('./models/Listing');
const jwt = require('jsonwebtoken');

exports.resolvers = {
	Query: {
		getCurrentUser: async (parent, args, { user }) => {
			return await User.findById(user._id);
		},

		getUserBookings: async (parent, args) => {
			return await Booking.find({ username: args.username });
		},

		getAdminListings: async (parent, args) => {
			// Get all, since we're assuming they're created by admins.
			return await Listing.find({});
		},

		getAdminCreatedListings: async (parent, args) => {
			console.log(`This is the type of listing.find: ${typeof Listing.find({ username: args.username })}`);
			return await Listing.find({ username: args.username });
		},

		searchListingByName: async (parent, args) => {
			return await Listing.find({ listing_title: args.listing_title });
		},

		searchListingByCity: async (parents, args) => {
			return await Listing.find({ city: args.city });
		},

		searchListingByPCode: async (parents, args) => {
			return await Listing.find({ postal_code: args.postal_code });
		}
	},

	Mutation: {
		login: async (parent, args) => {
			let user = await User.findOne({ username: args.username, password: args.password });
			return await jwt.sign({ user }, 'SUPER_SECRET', {
				algorithm: 'HS256',
				expiresIn: '1d'
			});
		},

		createUser: async (parent, args) => {
			let newUser = User({ ...args });
			console.log(newUser);
			return newUser.save();
		},

		createListing: async (parent, args) => {
			let newListing = Listing({ ...args });
			return newListing.save();
		},

		createBooking: async (parent, args) => {
			let newBooking = Booking({ ...args });
			return newBooking.save();
		}
	}
};
