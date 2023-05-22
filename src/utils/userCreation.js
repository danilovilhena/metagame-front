import { api } from 'services/api';

export default async function userCreation(user, { provider, providerId }) {
	let newUser = null;
	try {
		if (user) {
			const user_name_array = user.name?.split(' ');
			if (provider) {
				newUser = {
					username: user.username || user.email.split('@')[0],
					email: user.email,
					first_name: user_name_array ? user_name_array[0] : '',
					last_name: user_name_array ? user_name_array[user_name_array.length - 1] : '',
					provider: provider,
					image_url: user.image || '',
					password: providerId,
				};
			} else {
				newUser = {
					username: user.username || user.email.split('@')[0],
					email: user.email,
					first_name: user_name_array ? user_name_array[0] : '',
					last_name: user_name_array ? user_name_array[user_name_array.length - 1] : '',
					provider: provider,
					image_url: user.image || '',
					password: user.password,
				};
			}
			const response = await api.post('/users', newUser);
			console.log(response.data);
			return response.data;
		}
	} catch (err) {
		return err.response?.data || err.response;
	}
}
