import { createContext, useContext, useEffect, useState } from 'react';
import randomWords from 'random-words';

const MediasContext = createContext({});

export function MediasProvider({ children }) {
	const [medias, setMedias] = useState({});

	const getCover = (row, index) => {
		if (row === 0 && medias.movies && medias.movies[index]) {
			return `https://image.tmdb.org/t/p/w500${medias.movies[index].poster_path}`;
		} else if (row == 1 && medias.games && medias.games[index]) {
			return medias.games[index].background_image;
		} else if (row == 2 && medias.books && medias.books[index]) {
			return medias.books[index].volumeInfo.imageLinks.thumbnail;
		} else if (row == 3 && medias.movies && medias.movies[index + 9]) {
			return `https://image.tmdb.org/t/p/w500${medias.movies[index + 9].poster_path}`;
		}
	};

	const getCoverTitle = (row, item) => {
		if (item) {
			if (row === 0 && item.title) {
				return item.title;
			} else if (row === 1 && item.name) {
				return item.name;
			} else if (row === 2 && item.volumeInfo && item.volumeInfo.title) {
				return item.volumeInfo.title;
			}
		}
	};

	async function getMediaContent(max_movies = 10, max_books = 10, max_games = 10) {
		let data = {};

		// Movies
		let res = await fetch(
			`https://api.themoviedb.org/3/discover/movie/?api_key=${
				process.env.NEXT_PUBLIC_TMDB
			}&language=pt-BR&sort_by=popularity.desc&vote_average.gte=7&include_adult=false&include_video=false&page=${
				Math.random() * 25
			}`
		);
		let response = await res.json();
		data = { movies: response.results.slice(0, max_movies) };

		// Games
		res = await fetch(
			`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&page_size=${max_games}&page=2`
		);
		response = await res.json();
		data = { ...data, games: response.results };

		// Books
		res = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${randomWords()}&maxResults=${max_books}&orderBy=relevance&filter=paid-ebooks`
		);
		response = await res.json();
		data = { ...data, books: response.items };
		setMedias(data);
		return data;
	}

	useEffect(() => {
		async function fetchMediaContent() {
			const content = await getMediaContent(20);
			setMedias(content);
		}
		fetchMediaContent();
	}, []);

	return (
		<MediasContext.Provider value={{ medias, getCover, getCoverTitle, getMediaContent }}>
			{children}
		</MediasContext.Provider>
	);
}

export function useMedias() {
	return useContext(MediasContext);
}
