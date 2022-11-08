import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'services/api';

export const backendSlice = createSlice({
	name: 'backend',
	initialState: {
		goals: [],
		mediaTypes: [],
	},
	extraReducers: (builder) => {
		builder.addCase(setMediaTypes.fulfilled, (state, action) => {
			state.mediaTypes = action.payload;
		});

		builder.addCase(setGoals.fulfilled, (state, action) => {
			state.goals = action.payload;
		});
	},
});

export const setMediaTypes = createAsyncThunk('backend/setMediaTypes', async () => {
	const response = await api.get('/mediatypes');
	return response.data;
});

export const setGoals = createAsyncThunk('backend/setGoals', async (userId) => {
	const response = await api.get(`/goals/user/${userId}`);
	return response.data;
});

export default backendSlice.reducer;
