import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'services/api';

export const backendSlice = createSlice({
	name: 'backend',
	initialState: {
		favoriteGoals: [],
		goals: [],
		mediaTypes: [],
		userMedias: [],
	},
	reducers: {
		setFavoriteGoals: (state, action) => {
			state.favoriteGoals = action.payload;
		},
		setGoals: (state, action) => {
			state.goals = action.payload;
		},
		setMediaTypes: (state, action) => {
			state.mediaTypes = action.payload;
		},
		setUserMedias: (state, action) => {
			state.userMedias = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMediaTypes.fulfilled, (state, action) => {
			state.mediaTypes = action.payload;
		});

		builder.addCase(fetchGoals.fulfilled, (state, action) => {
			state.goals = action.payload.goals;
			state.favoriteGoals = action.payload.favorites;
		});

		builder.addCase(fetchUserMedias.fulfilled, (state, action) => {
			state.userMedias = action.payload;
		});
	},
});

export const fetchMediaTypes = createAsyncThunk('backend/fetchMediaTypes', async () => {
	const response = await api.get('/mediatypes');
	return response.data;
});

export const fetchGoals = createAsyncThunk('backend/fetchGoals', async (userId) => {
	const response = await api.get(`/goals/user/${userId}`);
	const favoritesResponse = await api.get(`/goals/user/${userId}/favorites`);
	return { goals: response.data, favorites: favoritesResponse.data };
});

export const fetchUserMedias = createAsyncThunk('backend/fetchUserMedias', async (userId) => {
	const response = await api.get(`/medias/user/${userId}`);
	return response.data;
});

export const { setFavoriteGoals, setGoals, setMediaTypes, setMedias } = backendSlice.actions;

export default backendSlice.reducer;
