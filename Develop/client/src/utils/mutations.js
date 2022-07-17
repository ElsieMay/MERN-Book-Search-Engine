import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;
export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		login(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;
export const SAVE_BOOK = gql`
	mutation saveBook($book: savedBook!) {
		saveBook(input: $book) {
			_id
			username
			email
			bookCount
			savedBooks {
				authors
				bookId
				image
				link
				title
				description
			}
		}
	}
`;
export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: ID!) {
		removeBook(bookId: $bookId) {
			_id
			username
			email
			bookCount
			savedBooks {
				authors
				bookId
				image
				link
				title
				description
			}
		}
	}
`;
