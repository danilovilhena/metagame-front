import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import userCreation from 'utils/userCreation';

// import AppleProvider from 'next-auth/providers/apple';
import { api } from 'services/api';
import { parseCookies } from 'nookies';

const authOptions = (req, res) => {
	return {
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
						var date = new Date();
						// add a day
						date.setDate(date.getDate() + 5);
						res.setHeader('Set-Cookie', [
							`metagame-token=${
								user_logged_in.data.token
							}; expires=Tue, ${date.toGMTString()}; HttpOnly; Max-Age=1209600; Path=/; SameSite=Lax`,
						]);
						return true;
					}
				} catch (err) {
					return '/auth-error';
				}

				return true;
			},
			async session() {
				const cookies = parseCookies({ req });
				try {
					if (cookies['metagame-token']) {
						api.defaults.headers['Authorization'] = `Bearer ${cookies['metagame-token']}`;
						const response = await api.get('/me', {});
						return response.data;
					} else {
						throw new Error();
					}
				} catch (err) {
					var date = new Date();
					date.setDate(date.getDate() - 10);
					res.setHeader('Set-Cookie', [
						`metagame-token=''; expires=Thu, ${date.toGMTString()}; HttpOnly; Max-Age=0; Path=/; SameSite=Lax`,
					]);
					return '/auth-error';
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
				var date = new Date();
				date.setDate(date.getDate() - 10);
				res.setHeader('Set-Cookie', [
					`metagame-token=''; expires=Thu, ${date.toGMTString()}; HttpOnly; Max-Age=0; Path=/; SameSite=Lax`,
				]);

				try {
					await api.get('/logout');
				} catch (err) {
					console.log(err);
				}
			},
		},
	};
};

// export default NextAuth(authOptions);

export default (req, res) => {
	return NextAuth(req, res, authOptions(req, res));
};
