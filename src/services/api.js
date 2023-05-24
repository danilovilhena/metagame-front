import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const baseURL =
	process.env.NODE_ENV === 'development'
		? 'http://127.0.0.1:8000/api'
		: 'http://18.229.107.10:8000/api';

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

	api.interceptors.response.use(
		async (response) => {
			return response;
		},
		({ response }) => {
			if (response.status === 401 && response.config.url === '/me') {
				signOut();
			}
		}
	);
	return api;
};

export const api = apiClient();
