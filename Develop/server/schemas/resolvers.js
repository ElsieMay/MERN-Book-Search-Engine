const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
	Query: {
		//finds one user by id
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
				return userData;
			}
			throw new AuthenticationError("You are not logged in");
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			console.log(args);
			const user = await User.create(args);
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("Can't find this user");
			}
			const correctPw = await user.isCorrectPassword(password);
			if (!correctPw) {
				throw new AuthenticationError("Wrong password!");
			}
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, { input }, context) => {
			console.log(context);
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: input } }, { new: true, runValidators: true });
				return updatedUser;
			}
			throw new AuthenticationError("You need to be logged in");
		},
		deleteBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId: bookId } } }, { new: true });
				return updatedUser;
			}
			throw new AuthenticationError("You need to be logged in");
		},
	},
};
// export the resolvers
module.exports = resolvers;
