import { Box, Stack, Image, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from 'styles/VerticalMovingCovers.module.css';
import { api } from 'services/api';
import randomWords from 'random-words';

export default function VerticalMovingCovers() {
	const [data, setData] = useState({});
	const isWideVersion = useBreakpointValue({
		base: false,
		xl: true,
	});

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

	return (
		<Box
			maxW={{ base: '100%', lg: '456px' }}
			maxH="100%"
			overflow="hidden"
			my={{ base: '2rem', lg: 0 }}
		>
			<Stack direction={{ base: 'column', lg: 'row' }} spacing="1rem">
				{[...Array(isWideVersion ? 4 : 3)].map((_, idx) => (
					<Stack
						className={
							idx % 2 === 0 ? styles['row-animate'] : styles['row-animate-i']
						}
						direction={{ base: 'row', lg: 'column' }}
						spacing="1rem"
						key={`cover-col-${idx}`}
					>
						{[...Array(10)].map((_, innerIdx) => (
							<Image
								transition="opacity 0.5s ease"
								w="100px"
								minH="150px"
								objectFit="cover"
								src={getCover(idx, innerIdx)}
								alt="cover"
								mb="0.5em"
								borderRadius="0.5rem"
								key={`cover-movie-${innerIdx}`}
								fallbackSrc="movie-cover.svg"
							/>
						))}
					</Stack>
				))}
			</Stack>
		</Box>
	);
}
