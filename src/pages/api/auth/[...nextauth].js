import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import userCreation from 'utils/userCreation';

// import AppleProvider from 'next-auth/providers/apple';
import { api } from 'services/api';

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
		error: '/auth-error',
	},
	session: { jwt: true },
	cookies: {
		sessionToken: {
			name: 'metagame-token',
			options: { httpOnly: true, sameSite: 'lax', path: '/', secure: true },
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			// Props of this function are : { user, account, profile, email, credentials }
			const isNotCredential = account && account.provider !== 'credentials';
			if (account && isNotCredential) {
				// Try to create account if its not crecential
				// It can return error or the user returned
				await userCreation(user, account.provider);
				// If it is the first login, the user is already logged in
			}
			// Do login for all type of providers
			try {
				const user_logged_in = await api.post('/login', {
					username: user.email || user.username,
					password: isNotCredential ? '' : user.password,
					provider: isNotCredential ? account.provider : '',
				});
				if (user_logged_in && user_logged_in.data) {
					user.token_jwt = user_logged_in.data.token;
					return true;
				}
			} catch (err) {
				return '/auth-error';
			}

			return true;
		},
		async session({ token }) {
			const token_jwt = token.token_jwt;
			api.defaults.headers['Authorization'] = `Bearer ${token_jwt}`;
			try {
				const response = await api.get('/me', {});
				const customSession = response.data;
				return customSession;
			} catch (err) {
				throw Error(err);
			}
		},

		async jwt({ token, user }) {
			if (user && user.token_jwt) {
				const token_jwt = user.token_jwt;
				return { ...token, token_jwt };
			}
			return token;
		},
	},
	events: {
		async signOut() {
			// Props of this function are : token
			try {
				await api.get('/logout');
			} catch (err) {
				console.log(err);
			}
		},
	},
};
export default NextAuth(authOptions);
