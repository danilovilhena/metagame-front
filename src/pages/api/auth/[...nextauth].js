import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import AppleProvider from 'next-auth/providers/apple';

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
		async signIn() {
			// TODO: pass data to backend
			// Props of this function are : { user, account, profile, email, credentials }
			return true;
		},
	},
};
export default NextAuth(authOptions);
