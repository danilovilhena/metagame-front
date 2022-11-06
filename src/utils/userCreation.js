import { api } from 'services/api';

export default async function userCreation(user, provider = '') {
	try {
		if (user) {
			const user_name_array = user.name?.split(' ');
			const response = await api.post('/users', {
				username: user.username || user.email.split('@')[0],
				email: user.email,
				first_name: user_name_array ? user_name_array[0] : '',
				last_name: user_name_array ? user_name_array[user_name_array.length - 1] : '',
				provider: provider,
				image_url: user.image || '',
				password: user.password || '',
			});
			return response.data;
		}
	} catch (err) {
		return err.response?.data || err.response;
	}
}
