const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Book {
		_id: ID!
		authors: String
		description: String
		bookId: String
		image: String
		forSale: String
		link: String
		title: String
	}
	type User {
		_id: ID!
		username: String
		bookCount: Int
		email: String
		savedBooks: [Book]
	}
	input savedBook {
		authors: [String]
		bookId: String
		description: String
		image: String
		forSale: String
		link: String
		title: String
	}
	type Query {
		me: User
	}
	type Auth {
		token: ID!
		user: User
	}
`;
// export the typeDefs
module.exports = typeDefs;
