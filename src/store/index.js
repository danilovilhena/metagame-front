import { configureStore } from '@reduxjs/toolkit';
import backendReducer from './backend';

export default configureStore({
	reducer: {
		backend: backendReducer,
	},
});
