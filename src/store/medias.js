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
		`https://api.themoviedb.org/3/discover/movie?api_key=${
			process.env.NEXT_PUBLIC_TMDB
		}&language=pt-BR&sort_by=popularity.desc&vote_average.gte=7&include_adult=false&include_video=false&page=${Math.round(
			Math.random() * 25 + 1
		)}`
	);
	let response = await res.json();
	data.movies = response.results.slice(0, max_items).map((movie) => {
		return {
			name_on_api: movie.title,
			description: movie.overview,
			image_on_api: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			id_on_api: movie.id,
			releaseDate: movie.release_date,
			mediatype_id: 1,
		};
	});

	// Games
	res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&page_size=${max_items}&page=2`
	);
	response = await res.json();
	data.games = response.results.map((game) => {
		return {
			name_on_api: game.name,
			description: '',
			image_on_api: game.background_image,
			id_on_api: game.id,
			releaseDate: game.released,
			mediatype_id: 2,
		};
	});

	// Books
	res = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${randomWords()}&maxResults=${max_items}&orderBy=relevance&filter=paid-ebooks`
	);
	response = await res.json();
	data.books = response.items.map((book) => {
		return {
			name_on_api: book?.volumeInfo?.title,
			description: book?.volumeInfo?.description,
			image_on_api: book?.volumeInfo?.imageLinks?.thumbnail,
			id_on_api: book.id,
			releaseDate: book.volumeInfo.publishedDate,
			mediatype_id: 3,
		};
	});
	return data;
};

export const fetchMediaContent = createAsyncThunk('medias/fetchMediaContent', async (max_items) => {
	const response = await getMediaContent(max_items);
	return response;
});

export default mediasSlice.reducer;
