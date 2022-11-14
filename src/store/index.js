import { configureStore } from '@reduxjs/toolkit';
import backendReducer from './backend';
import mediasReducer from './medias';

export default configureStore({
	reducer: {
		backend: backendReducer,
		medias: mediasReducer,
	},
});
