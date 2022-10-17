import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { userCreation } from '../../../utils/userCreation';

// import AppleProvider from 'next-auth/providers/apple';
import { api } from '../../../services/api';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// AppleProvider({
		// 	clientId: process.env.APPLE_ID,
		// 	clientSecret: process.env.APPLE_SECRET,
		// }),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'text' },
			},
			async authorize(credentials) {
				return credentials;
			},
		}),
	],
	pages: {
		signIn: '/',
	},
	callbacks: {
		async signIn() {
			// Props of this function are : { user, account, profile, email, credentials }

			return true;
		},
		async session({ session, token }) {
			console.log('Session token user');
			console.log(token.user);
			console.log('Session token user');
			console.log(token.error);
			// Session returns: {
			//   user: {
			//     name: string,
			//     email: string,
			//     image: string
			//   },
			//   expires: string
			// }

			return session;
		},

		async jwt({ token, user, account }) {
			// Parameters for this function are : { token, user, account, profile, isNewUser }

			const isNotCredential = account && account.provider !== 'credentials';
			if (account && isNotCredential) {
				// Try to create account if its not crecential
				// It can return error or the user returned
				const user_response = await userCreation(user, account.provider);
				// If it is the first login, the user is already logged in
				if (user_response && !user_response.error) {
					user_response && (token.user = user_response);
					return token;
				}
			}
			// Do login for all type of providers
			try {
				const user_logged_in = await api.post('/login', {
					username: user.email || user.username,
					password: isNotCredential ? '' : user.password,
					provider: isNotCredential ? account.provider : '',
				});
				user_logged_in && (token.user = user_logged_in);
				return token;
			} catch (err) {
				if (err && err.response && err.response.data) {
					const error = err.response.data;
					error && (token.error = error);
					return token;
				}
				// Return default token if nothing works'
				return token;
			}
		},
	},
	events: {
		async signOut() {
			// Props of this function are : token
			try {
				const response = await api.get('/logout');
				console.log(response);
			} catch (err) {
				console.log(err);
			}
		},
	},
};
export default NextAuth(authOptions);
