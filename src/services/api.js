import axios from 'axios';
import { getSession } from 'next-auth/react';

const baseURL =
	process.env.NODE_ENV === 'development'
		? 'http://127.0.0.1:8000/api'
		: 'https://api.metagame.website/api/';

const apiClient = () => {
	const api = axios.create({ baseURL: baseURL });

	api.interceptors.request.use(
		async (request) => {
			const session = await getSession(request);

			if (session) {
				request.headers.Authorization = `Bearer ${session.token_jwt}`;
			}
			return request;
		},
		(error) => {
			console.error(error);
			throw new Error(error.response.data.message);
		}
	);

	return api;
};

export const api = apiClient();
