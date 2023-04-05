import { VStack, Image, Flex, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import { Input } from 'components/common/Input';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { getName } from 'utils/mediaTypes';
import { capitalize } from 'utils/functions';
import { Media } from 'components/common/Media';

const fetchMovies = async (searchInput) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB}&page=1&include_adult=false&include_video=false&query=${searchInput}&language=pt-BR&include_video=false`
	);
	const response = await res.json();
	return response?.results?.slice(0, 10)?.map((movie) => {
		return {
			name_on_api: movie.title,
			description: movie.overview,
			image_on_api: `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`,
			id_on_api: movie.id,
			releaseDate: movie.release_date,
			mediatype_id: 1,
		};
	});
};

const fetchGames = async (searchInput) => {
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&maxResults=10&search=${searchInput}`
	);
	const response = await res.json();
	return response?.results?.map((game) => {
		return {
			name_on_api: game.name,
			description: '',
			image_on_api: game.background_image,
			id_on_api: game.id,
			releaseDate: game.released,
			mediatype_id: 2,
		};
	});
};

const fetchBooks = async (searchInput) => {
	const res = await fetch(
		`https://www.googleapis.com/books/v1/volumes?orderBy=relevance&filter=paid-ebooks&&page_size=10&q=${searchInput}`
	);
	const response = await res.json();
	return response?.items?.map((book) => {
		return {
			name_on_api: book?.volumeInfo?.title,
			description: book?.volumeInfo?.description,
			image_on_api: book?.volumeInfo?.imageLinks?.thumbnail,
			id_on_api: book.id,
			releaseDate: book.volumeInfo.publishedDate,
			mediatype_id: 3,
		};
	});
};

export default function AddRegister({ isModalOpen, setIsModalOpen }) {
	const medias = useSelector((state) => state.medias.value);
	const [searchInput, setSearchInput] = useState('');
	const [filteredMedias, setFilteredMedias] = useState(null);
	const [filterCategory, setFilterCategory] = useState(0);

	const mediaTypes = useSelector((state) => [
		{ id: 0, type: 'Todos' },
		...state.backend.mediaTypes,
	]);

	const filterCategoryName = () => {
		const name = mediaTypes.find((el) => el.id === filterCategory)?.type;
		return filterCategory === 0 ? name : `${capitalize(getName(name))}s`;
	};

	useEffect(() => {
		if (searchInput) {
			const delayDebounceFn = setTimeout(async () => {
				let data = [];

				if (filterCategory === 0) {
					const movies = await fetchMovies(searchInput);
					const games = await fetchGames(searchInput);
					const books = await fetchBooks(searchInput);
					let i = 0;

					while (i < books.length && i < movies.length && i < games.length) {
						if (books[i]) data.push(books[i]);
						if (movies[i]) data.push(movies[i]);
						if (games[i]) data.push(games[i]);
						i++;
					}
				} else if (filterCategory === 1) {
					data = await fetchMovies(searchInput);
				} else if (filterCategory === 2) {
					data = await fetchGames(searchInput);
				} else if (filterCategory === 3) {
					data = await fetchBooks(searchInput);
				}

				setFilteredMedias(data);
			}, 200);

			return () => clearTimeout(delayDebounceFn);
		} else {
			setFilteredMedias(null);
		}
	}, [searchInput, filterCategory]);

	return (
		<Modal
			variant="unstyled"
			ModalTitle="Adicionar registro"
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
			modalSize={['sm', '2xl']}
		>
			<VStack
				alignItems="start"
				spacing="1rem"
				color="primary"
				width="100%"
				mb="4"
				mt="-2"
				_dark={{ color: 'white' }}
			>
				{/* search fields */}
				<Flex width="100%">
					<Input
						placeholder="Buscar por filmes, livros ou jogos"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						mr="1rem"
					/>
					<Menu matchWidth>
						<MenuButton as="div">
							<Button
								variant="styled"
								background="primary"
								width="100%"
								display="flex"
								justifyContent="space-between"
							>
								{filterCategoryName()}
								<ChevronDownIcon />
							</Button>
						</MenuButton>
						<MenuList m inW="max-content">
							{mediaTypes.map((media, idx) => (
								<MenuItem onClick={() => setFilterCategory(media.id)} key={idx}>
									{idx === 0 ? media.type : `${capitalize(getName(media.type))}s`}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
				</Flex>

				{/* query media */}

				<Flex
					width="100%"
					wrap="wrap"
					gap="5px"
					justifyContent="space-around"
					overflow="auto"
					height="400px"
					maxH="600px"
				>
					{searchInput ? (
						filteredMedias && filteredMedias.length > 0 ? (
							filteredMedias.map((media, idx) => (
								<Media key={idx} media={media} showShadow={false} />
							))
						) : (
							<Text fontWeight="bold" alignSelf="center">
								Mídia não encontrada
							</Text>
						)
					) : (
						[...Array(10)].map((_, idx) => {
							// Counting from 0 to 2
							const mediaIndex = idx % 3;
							if (filterCategory !== 0 && filterCategory !== mediaIndex + 1) return;
							const currentMediaType = Object.values(medias)[mediaIndex];
							if (currentMediaType) {
								return (
									<Media
										media={currentMediaType[idx]}
										showShadow={false}
										key={`defaultMedias-${idx}`}
									/>
								);
							}
							return <Flex key={`defaultMedias-${idx}`}></Flex>;
						})
					)}
				</Flex>

				{/* add button */}
				<Button isDisabled={true} variant="styled" width="100%">
					<Image src={getIcon('add')} w="1.5rem" alt="" mr="2" />
					Marcar como
				</Button>
			</VStack>
		</Modal>
	);
}
