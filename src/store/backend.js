import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'services/api';

export const backendSlice = createSlice({
	name: 'backend',
	initialState: {
		favoriteGoals: [],
		goals: [],
		mediaTypes: [],
		userMedias: [],
		popularGoals: [],
		popularMedias: [],
		ranking: [],
		userRanking: [],
		goal: [],
		goalMedias: [],
	},
	reducers: {
		setFavoriteGoals: (state, action) => {
			state.favoriteGoals = action.payload;
		},
		setPopularGoals: (state, action) => {
			state.popularGoals = action.payload;
		},
		setGoals: (state, action) => {
			state.goals = action.payload;
		},
		setGoal: (state, action) => {
			state.goal = action.payload;
		},
		setMediaTypes: (state, action) => {
			state.mediaTypes = action.payload;
		},
		setUserMedias: (state, action) => {
			state.userMedias = action.payload;
		},
		setPopularMedias: (state, action) => {
			state.popularMedias = action.payload;
		},
		setRanking: (state, action) => {
			state.ranking = action.payload;
		},
		setUserRanking: (state, action) => {
			state.userRanking = action.payload;
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
		builder.addCase(fetchGoal.fulfilled, (state, action) => {
			state.goal = action.payload.goal;
		});
		builder.addCase(fetchGoalMedias.fulfilled, (state, action) => {
			state.goalMedias = action.payload.goalMedias;
		});
		builder.addCase(fetchPopularGoals.fulfilled, (state, action) => {
			state.popularGoals = action.payload;
		});
		builder.addCase(fetchPopularMedias.fulfilled, (state, action) => {
			state.popularMedias = action.payload;
		});
		builder.addCase(fetchUserMedias.fulfilled, (state, action) => {
			state.userMedias = action.payload;
		});
		builder.addCase(fetchRanking.fulfilled, (state, action) => {
			state.ranking = action.payload;
		});
		builder.addCase(fetchUserRanking.fulfilled, (state, action) => {
			state.userRanking = action.payload;
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
export const fetchGoal = createAsyncThunk('backend/fetchGoal', async (goalId) => {
	const response = await api.get(`/goals/${goalId}`);
	return { goal: response.data };
});
export const fetchGoalMedias = createAsyncThunk('backend/fetchGoalMedias', async (goalId) => {
	const response = await api.get(`/medias/goal/${goalId}`);
	const formatedResponse = response.data.map((goal) => {
		return { ...goal, mediatype_id: goal.mediatype };
	});
	return { goalMedias: formatedResponse };
});

export const fetchPopularGoals = createAsyncThunk('backend/fetchPopularGoals', async () => {
	const response = await api.get('/goals/favorites');
	return response.data;
});
export const fetchPopularMedias = createAsyncThunk('backend/fetchPopularMedias', async () => {
	const response = await api.get('/medias/top');
	return response.data;
});

export const fetchUserMedias = createAsyncThunk('backend/fetchUserMedias', async (userId) => {
	const response = await api.get(`/medias/user/${userId}`);
	return response.data;
});

export const fetchRanking = createAsyncThunk('backend/fetchRanking', async () => {
	const response = await api.get('/ranking');
	const ranking = response.data;

	const mappedRanking = await Promise.all(
		ranking.map(async (user) => {
			const response = await api.get(`/users/${user.user_id}`);
			return { ...user, ...response.data };
		})
	);

	return mappedRanking;
});
export const fetchUserRanking = createAsyncThunk('backend/fetchUserRanking', async (userId) => {
	const response = await api.get(`/ranking/user/${userId}`);
	const ranking = response.data[0].points;

	return ranking;
});

export const {
	setFavoriteGoals,
	setPopularGoals,
	setGoals,
	setMediaTypes,
	setMedias,
	setPopularMedias,
} = backendSlice.actions;

export default backendSlice.reducer;
