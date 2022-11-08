import randomWords from 'random-words';

export async function getMediaContent(max_movies = 10, max_books = 10, max_games = 10) {
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
	// Books
	res = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${randomWords()}&maxResults=${max_books}&orderBy=relevance&filter=paid-ebooks`
	);
	response = await res.json();
	data = { ...data, books: response.items };

	res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&page_size=${max_games}&page=2`
	);
	response = await res.json();
	data = { ...data, games: response.results };
	return data;
}
