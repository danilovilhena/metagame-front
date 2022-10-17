import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

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
			async authorize() {
				return {};
			},
		}),
	],
	pages: {
		signIn: '/',
	},
	callbacks: {
		async signIn({ user, account, credentials }) {
			// Props of this function are : { user, account, profile, email, credentials }

			if (account.provider !== 'credentials') {
				const user_name_array = user.name.split(' ');
				try {
					const response = await api.post('/user', {
						username: user.email,
						email: user.email,
						first_name: user_name_array[0],
						last_name: user_name_array[user_name_array.length - 1],
						provider: account.provider,
						password: '',
					});
					console.log(response);
				} catch (error) {
					const { response } = error;
					if (
						response.status === 401 &&
						response.data.error == 'Email já cadastrado'
					) {
						try {
							const response = await api.post('/login', {
								username: user.email,
								password: '',
								provider: account.provider,
							});
							console.log(response);
						} catch (err) {
							console.log(err);
						}
					}
				}
			} else {
				const { email, password } = credentials;
				try {
					const response = await api.post('/login', {
						username: email,
						password: password,
						provider: '',
					});
					console.log(response);
				} catch (err) {
					console.log(err);
				}
			}
			return true;
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
