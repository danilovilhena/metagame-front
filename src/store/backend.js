import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'services/api';

export const backendSlice = createSlice({
	name: 'backend',
	initialState: {
		goals: [],
		mediaTypes: [],
		medias: [],
	},
	reducers: {
		setGoals: (state, action) => {
			state.goals = action.payload;
		},
		setMediaTypes: (state, action) => {
			state.mediaTypes = action.payload;
		},
		setMedias: (state, action) => {
			state.medias = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMediaTypes.fulfilled, (state, action) => {
			state.mediaTypes = action.payload;
		});

		builder.addCase(fetchGoals.fulfilled, (state, action) => {
			state.goals = action.payload;
		});

		builder.addCase(fetchMedias.fulfilled, (state, action) => {
			state.medias = action.payload;
		});
	},
});

export const fetchMediaTypes = createAsyncThunk('backend/fetchMediaTypes', async () => {
	const response = await api.get('/mediatypes');
	return response.data;
});

export const fetchGoals = createAsyncThunk('backend/fetchGoals', async (userId) => {
	const response = await api.get(`/goals/user/${userId}`);
	return response.data;
});

export const fetchMedias = createAsyncThunk('backend/fetchMedias', async (userId) => {
	const response = await api.get(`/medias/user/${userId}`);
	return response.data;
});

export const { setGoals, setMediaTypes } = backendSlice.actions;

export default backendSlice.reducer;
