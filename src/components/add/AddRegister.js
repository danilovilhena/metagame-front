import {
	VStack,
	Image,
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import showToast from 'utils/showToast';
import { Input } from 'components/common/Input';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getConclusion, getName } from 'utils/mediaTypes';
import { api } from 'services/api';
import { fetchGoals, fetchUserMedias } from 'store/backend';
import { capitalize } from 'utils/functions';

const fetchMovies = async (searchInput) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB}&page=1&include_adult=false&include_video=false&query=${searchInput}&language=pt-BR&include_video=false`
	);
	const response = await res.json();
	return response?.results?.slice(0, 10)?.map((movie) => {
		return {
			title: movie.title,
			description: movie.overview,
			image: `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`,
			idOnApi: movie.id,
			releaseDate: movie.release_date,
			type: 0,
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
			title: game.name,
			description: '',
			image: game.background_image,
			idOnApi: game.id,
			releaseDate: game.released,
			type: 1,
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
			title: book?.volumeInfo?.title,
			description: book?.volumeInfo?.description,
			image: book?.volumeInfo?.imageLinks?.thumbnail,
			idOnApi: book.id,
			releaseDate: book.volumeInfo.publishedDate,
			type: 2,
		};
	});
};

export const Media = ({ isActive, action, image, title, ...rest }) => (
	<Flex
		as="button"
		flexDirection="column"
		alignItems="center"
		padding="0.5rem"
		borderRadius="20px"
		border={isActive && 'solid 2px var(--chakra-colors-secondary)'}
		onClick={action}
		{...rest}
	>
		<Image
			width="120px"
			height="180px"
			objectFit="cover"
			borderRadius="10px"
			alt="cover"
			mb="0.5em"
			boxShadow="lg"
			_dark={{ boxShadow: 'dark-lg' }}
			src={image}
		/>
		<Text
			fontWeight="500"
			maxW="130px"
			className="textElipsis"
			fontSize="1em"
			lineHeight="1.3em"
			textAlign="center"
			overflow="hidden"
		>
			{title}
		</Text>
	</Flex>
);

export default function AddRegister({ isModalOpen, setIsModalOpen, closeAllModals }) {
	const medias = useSelector((state) => state.medias.value);
	const [searchInput, setSearchInput] = useState('');
	const [mediaSelected, setMediaSelected] = useState(null);
	const [filteredMedias, setFilteredMedias] = useState(null);
	const [filterCategory, setFilterCategory] = useState(0);

	const mediaTypes = useSelector((state) => [
		{ id: 0, type: 'Todos' },
		...state.backend.mediaTypes,
	]);

	const dispatch = useDispatch();
	const toast = useToast();
	const session = useSession();

	const filterCategoryName = () => {
		const name = mediaTypes.find((el) => el.id === filterCategory)?.type;
		return filterCategory === 0 ? name : `${capitalize(getName(name))}s`;
	};

	const handleSelected = (idx, media) => {
		if (mediaSelected?.item === media) setMediaSelected(null);
		else {
			setMediaSelected({ type: media.type, item: media });
		}
	};

	const resetStates = () => {
		setSearchInput('');
		setMediaSelected(null);
		setFilteredMedias(null);
		setFilterCategory(0);
	};

	const addRegister = async () => {
		api
			.post('/medias', {
				mediatype: mediaSelected.type + 1,
				id_on_api: mediaSelected.item.idOnApi,
				image_on_api: mediaSelected.item.image,
			})
			.then(() => {
				showToast(toast, 'Mídia adicionada com sucesso!', 'success');
				resetStates();
				closeAllModals();
				dispatch(fetchUserMedias(session.data.id));
				dispatch(fetchGoals(session.data.id));
			})
			.catch((err) => {
				showToast(toast, `${err?.response?.data?.error}.` || 'Erro ao adicionar mídia!', 'error');
			});
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
			}, 100);

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
			modalSize="2xl"
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
				{!mediaSelected && (
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
							<MenuList minW="max-content">
								{mediaTypes.map((media, idx) => (
									<MenuItem onClick={() => setFilterCategory(media.id)} key={idx}>
										{idx === 0 ? media.type : `${capitalize(getName(media.type))}s`}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</Flex>
				)}
				{/* query media */}
				{!mediaSelected && (
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
									<Media
										key={idx}
										isActive={mediaSelected && media.id === mediaSelected.item.id}
										action={() => handleSelected(idx % 3, media)}
										image={media.image}
										title={media.title}
									/>
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
								if (filterCategory !== 0 && filterCategory !== mediaIndex) return;
								const currentMediaType = Object.values(medias)[mediaIndex];
								if (currentMediaType) {
									return (
										<Media
											isActive={mediaSelected && currentMediaType[idx].id === mediaSelected.item.id}
											action={() =>
												handleSelected(mediaIndex, { ...currentMediaType[idx], type: mediaIndex })
											}
											image={currentMediaType[idx].image}
											title={currentMediaType[idx].title}
											key={`defaultMedias-${idx}`}
										/>
									);
								}
								return <Flex key={`defaultMedias-${idx}`}></Flex>;
							})
						)}
					</Flex>
				)}
				{/* selected media info */}
				{mediaSelected && (
					<Flex w="100%" flexDir="row">
						<Button variant="unstyled" mr=".5rem" onClick={() => setMediaSelected(null)} px="0">
							<Image src={getIcon('chevron-left')} alt="Voltar" />
						</Button>
						<Image
							width="120px"
							height="180px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mr="1rem"
							boxShadow="lg"
							_dark={{ boxShadow: 'dark-lg' }}
							src={mediaSelected.item.image}
						/>
						<VStack
							spacing=".5rem"
							alignItems="start"
							overflowY="auto"
							flex="1"
							maxH="40vh"
							pr=".5rem"
						>
							<Text>
								<Text as="strong">Nome: </Text>
								{mediaSelected.item.title}
							</Text>
							<Text>
								<Text as="strong">Categoria: </Text>
								{{ 0: 'Filme', 1: 'Jogo', 2: 'Livro' }[mediaSelected.item.type]}
							</Text>
							<Text>
								<Text as="strong">Ano de lançamento: </Text>
								{new Date(mediaSelected.item.releaseDate).getFullYear()}
							</Text>
							<Text>
								<Text as="strong">Descrição: </Text>
								{mediaSelected.item.description || 'Sem descrição'}
							</Text>
						</VStack>
					</Flex>
				)}
				{/* add button */}
				<Button isDisabled={!mediaSelected} variant="styled" width="100%" onClick={addRegister}>
					<Image src={getIcon('add_dark')} w="1.5rem" alt="" mr="2" />
					Marcar{' '}
					{getName(
						mediaTypes
							.slice(1)
							.map((media, idx) => {
								return { ...media, id: idx };
							})
							.find((el) => el.id === mediaSelected?.type)?.type
					)}{' '}
					como{' '}
					{getConclusion(
						mediaTypes
							.slice(1)
							.map((media, idx) => {
								return { ...media, id: idx };
							})
							.find((el) => el.id === mediaSelected?.type)?.type
					)?.slice(0, -1)}
				</Button>
			</VStack>
		</Modal>
	);
}
