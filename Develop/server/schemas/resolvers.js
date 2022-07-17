const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
	Query: {
		//finds one user by id
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user_id });
				return userData;
			}
			throw new AuthenticationError("You are not logged in");
		},
	},
	Mutation: {
		addUser: async (parent, args) => {
			const user = await User.create({ args });
			const token = signToken(user);
			return { user, token };
		},
		login: async (parent, { email, password }) => {
			const userData = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError("Can't find this user");
			}
			const token = signToken(user);
		},
	},
};
// export the resolvers
module.exports = resolvers;
