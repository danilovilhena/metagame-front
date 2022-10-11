import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
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
	],
	callbacks: {
		async signIn({ user, account }) {
			// Props of this function are : { user, account, profile, email, credentials }

			const user_name_array = user.name.split(' ');

			try {
				await api.post('/user', {
					username: user.email,
					email: user.email,
					first_name: user_name_array[0],
					last_name: user_name_array[user_name_array.length - 1],
					provider: account.provider,
					password: '',
				});

				console.log('Usuário cadastrado com sucesso.');
			} catch (err) {
				console.log(err);
			}

			return true;
		},
	},
	events: {
		async signOut({ token }) {
			// Props of this function are : token
			console.log(token);
		},
	},
};
export default NextAuth(authOptions);
