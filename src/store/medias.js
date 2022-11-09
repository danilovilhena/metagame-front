import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import randomWords from 'random-words';

export const mediasSlice = createSlice({
	name: 'medias',
	initialState: {
		value: {},
	},
	reducers: {
		setMedias: (state, action) => {
			state.value = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchMediaContent.fulfilled, (state, action) => {
			state.value = action.payload;
		});
	},
});

const getMediaContent = async (max_items) => {
	let data = {};

	let res = await fetch(
		`https://api.themoviedb.org/3/discover/movie/?api_key=${
			process.env.NEXT_PUBLIC_TMDB
		}&language=pt-BR&sort_by=popularity.desc&vote_average.gte=7&include_adult=false&include_video=false&page=${
			Math.random() * 25
		}`
	);
	let response = await res.json();
	data.movies = response.results.slice(0, max_items);

	// Games
	res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&page_size=${max_items}&page=2`
	);
	response = await res.json();
	data.games = response.results;

	// Books
	res = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${randomWords()}&maxResults=${max_items}&orderBy=relevance&filter=paid-ebooks`
	);
	response = await res.json();
	data.books = response.items;
	return data;
};

export const fetchMediaContent = createAsyncThunk('medias/fetchMediaContent', async (max_items) => {
	const response = await getMediaContent(max_items);
	return response;
});

export default mediasSlice.reducer;

// utility functions
const detectMedia = (media) => {
	if (media?.poster_path) return 'movie';
	else if (media?.volumeInfo) return 'book';
	else return 'game';
};

export const getCover = (item) => {
	if (item) {
		const media = detectMedia(item);
		if (media === 'movie') return `https://image.tmdb.org/t/p/w500${item?.poster_path}`;
		else if (media === 'game') return item?.background_image;
		else return item?.volumeInfo?.imageLinks?.thumbnail;
	}
};

export const getCoverTitle = (item) => {
	if (item) {
		const media = detectMedia(item);
		if (media === 'movie') return item?.title;
		else if (media === 'game') return item?.name;
		else return item?.volumeInfo?.title;
	}
};
