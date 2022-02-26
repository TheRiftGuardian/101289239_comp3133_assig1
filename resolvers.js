const User = require('./models/User');
const Booking = require('./models/Booking');
const Listing = require('./models/Listing');
const jwt = require('jsonwebtoken');

exports.resolvers = {
	Query: {
		getCurrentUser: async (parent, args, { user, sub }) => {
			return await User.findById(sub);
		},

		getUserBookings: async (parent, args, { user }) => {
			return await Booking.find({ username: user.username });
		},

		getAdminListings: async (parent, args) => {
			adminList = User.find({ type: 'admin' });

			let adminListings;
			for (admin in adminList) {
				adminListings += Listing.find({ username: admin.username });
			}
			return await adminListings;
		},

		getAdminCreatedListings: async (parent, args, { user }) => {
			if (user.type != 'admin') {
				return null;
			}
			return await Listing.find({ username: user.username });
		},

		searchListingByName: async (parent, args) => {
			return await Listing.find({ username: args.username });
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
				subject: user._id.toString(),
				expiresIn: '1d'
			});
		},

		createUser: async (parent, args) => {
			console.log(args);
			console.log('wad');
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
