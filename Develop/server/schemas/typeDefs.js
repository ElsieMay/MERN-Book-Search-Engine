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
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveBook(input: savedBook!): User
		deleteBook(bookId: ID!): User
	}
`;
// export the typeDefs
module.exports = typeDefs;
