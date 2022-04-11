const User = require('./models/User');
const Booking = require('./models/Booking');
const Listing = require('./models/Listing');
const jwt = require('jsonwebtoken');

exports.resolvers = {
	Query: {
		getCurrentUser: async (parent, args, { user, sub }) => {
			console.log(User.findById(sub));
			return await User.findById(sub);
		},

		getCurrentUserBookings: async (parent, args, { user }) => {
			return await Booking.find({ username: user.username });
		},
		getUserBookings: async (parent, args, { user }) => {
			return await Booking.find({ username: args.username });
		},

		getAdminListings: async (parent, args) => {
			// Get all, since we're assuming they're created by admins.
			return await Listing.find({});
		},

		getAdminCreatedListings: async (parent, args) => {
			return await Listing.find({ username: args.username });
		},

		searchListingByAny: async (parent, args) => {
			return await Listing.find({
				$or: [
					{ listing_title: new RegExp(args.str, 'i') },
					{ city: new RegExp(args.str, 'i') },
					{ postal_code: new RegExp(args.str, 'i') }
				]
			});
		},

		searchListingByName: async (parent, args) => {
			return await Listing.find({ listing_title: args.listing_title });
		},

		searchListingByCity: async (parents, args) => {
			return await Listing.find({ city: args.city });
		},

		searchListingByPCode: async (parents, args) => {
			return await Listing.find({ postal_code: args.postal_code });
		},
		searchListingByID: async (parent, args) => {
			return await Listing.find({ listing_id: args.listing_id });
		}
	},

	Mutation: {
		login: async (parent, args, { res }) => {
			let user = await User.findOne({ username: args.username, password: args.password });
			if (user == null) {
				return null;
			}
			return await jwt.sign({ user }, 'SUPER_SECRET', {
				algorithm: 'HS256',
				subject: user._id.toString(),
				expiresIn: '1d'
			});
		},

		createUser: async (parent, args) => {
			let newUser = new User({ ...args });
			console.log(newUser);
			return newUser.save();
		},

		createListing: async (parent, args, { user }) => {
			let newListing = await Listing({ ...args });
			return newListing.save();
		},

		createBooking: async (parent, args, { user }) => {
			let newBooking = await Booking({ ...args });
			return newBooking.save();
		}
	}
};
