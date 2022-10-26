import { useState, useEffect } from 'react';
import randomWords from 'random-words';

import Header from 'components/home/Header';
import Cover from 'components/home/Cover';
import Info from 'components/home/Info';
import TabsComponent from 'components/home/TabsComponent';
import FAQ from 'components/home/FAQ';
import Footer from 'components/home/Footer';

import { api } from 'services/api';
import { parseCookies } from 'nookies';

export default function Index() {
	const [data, setData] = useState({});

	const getCover = (row, index) => {
		if (row === 0 && data.movies && data.movies[index]) {
			return `https://image.tmdb.org/t/p/w500${data.movies[index].poster_path}`;
		} else if (row == 1 && data.games && data.games[index]) {
			return data.games[index].background_image;
		} else if (row == 2 && data.books && data.books[index]) {
			return data.books[index].volumeInfo.imageLinks.thumbnail;
		} else if (row == 3 && data.movies && data.movies[index + 9]) {
			return `https://image.tmdb.org/t/p/w500${
				data.movies[index + 9].poster_path
			}`;
		}
	};

	useEffect(() => {
		const fetchMovies = async () => {
			const res = await api.get(
				`https://api.themoviedb.org/3/discover/movie/?api_key=${
					process.env.NEXT_PUBLIC_TMDB
				}&language=pt-BR&sort_by=popularity.desc&vote_average.gte=7&include_adult=false&include_video=false&page=${
					Math.random() * 25
				}`
			);
			return res.data.results;
		};

		const fetchBooks = async () => {
			const res = await api.get(
				`https://www.googleapis.com/books/v1/volumes?q=${randomWords()}&maxResults=40&orderBy=relevance&filter=paid-ebooks`
			);
			return res.data.items;
		};

		const fetchGames = async () => {
			const res = await api.get(
				`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&page_size=40&page=2`
			);
			return res.data.results;
		};

		fetchMovies().then((res) => {
			setData((prev) => {
				return { ...prev, movies: res };
			});
		});

		fetchBooks().then((res) => {
			setData((prev) => {
				return { ...prev, books: res };
			});
		});

		fetchGames().then((res) => {
			setData((prev) => {
				return { ...prev, games: res };
			});
		});
	}, []);

	return (
		<>
			<Header />
			<Cover content={data} getCover={getCover} />
			<Info />
			<TabsComponent content={data} getCover={getCover} />
			<FAQ />
			<Footer />
		</>
	);
}

export async function getServerSideProps(ctx) {
	const cookies = parseCookies(ctx);
	const token = cookies['metagame-token'];

	if (token) {
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
