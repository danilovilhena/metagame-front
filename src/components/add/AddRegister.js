import {
	VStack,
	Image,
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
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
import { getCover, getCoverTitle } from 'store/medias';
import { api } from 'services/api';
import { fetchGoals, fetchUserMedias } from 'store/backend';

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
const fetchSection = async (name, data, url) => {
	try {
		const res = await fetch(url);
		const response = await res.json();
		data[name] = name === 'books' ? response.items : response.results.slice(0, 10);
	} catch (err) {
		console.log(err);
	}
};
const Media = ({ isActive, action, image, title, ...rest }) => (
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

	const filterCategoryName = mediaTypes.find((el) => el.id === filterCategory)?.type;

	const handleSelected = (idx, media) => {
		if (mediaSelected?.item === media) setMediaSelected(null);
		else setMediaSelected({ type: idx, item: media });
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
				id_on_api: mediaSelected.item.id,
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
				let data = {};

				if ([0, 1].includes(filterCategory)) {
					await fetchSection(
						'movies',
						data,
						`https://api.themoviedb.org/3/search/movie/?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&query=${searchInput}`
					);
				} else data = { ...data, movies: [] };

				if ([0, 2].includes(filterCategory)) {
					await fetchSection(
						'games',
						data,
						`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&maxResults=10&search=${searchInput}`
					);
				} else data = { ...data, games: [] };

				if ([0, 3].includes(filterCategory)) {
					await fetchSection(
						'books',
						data,
						`https://www.googleapis.com/books/v1/volumes?orderBy=relevance&filter=paid-ebooks&&page_size=10&q=${searchInput}`
					);
				} else data = { ...data, books: [] };
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
									{filterCategory === 0
										? filterCategoryName
										: `${capitalize(getName(filterCategoryName))}s`}
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
							filteredMedias &&
							Object.keys(filteredMedias).every((key) => filteredMedias[key]?.length > 0) ? (
								Object.values(filteredMedias).map((medias, idx) => (
									<Box key={idx}>
										{medias.map((media) => (
											<Media
												isActive={mediaSelected && media.id === mediaSelected.item.id}
												action={() => handleSelected(idx, media)}
												image={getCover(media)}
												title={getCoverTitle(media)}
												key={media.id}
											/>
										))}
									</Box>
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
								if (filterCategory !== 0 && filterCategory !== mediaIndex) {
									return;
								}
								const currentMediaType = Object.values(medias)[mediaIndex];
								if (currentMediaType) {
									return (
										<Media
											isActive={mediaSelected && currentMediaType[idx].id === mediaSelected.item.id}
											action={() => handleSelected(mediaIndex, currentMediaType[idx])}
											image={getCover(currentMediaType[idx])}
											title={getCoverTitle(currentMediaType[idx])}
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
							src={getCover(mediaSelected.item)}
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
								<Text as="strong">Name: </Text>
								{mediaSelected.item.title ||
									mediaSelected.item.name ||
									mediaSelected.item.volumeInfo.title}
							</Text>
							<Text>
								<Text as="strong">Categoria: </Text>
								{mediaSelected.type === 0 ? 'Filme' : mediaSelected.type === 1 ? 'Jogo' : 'Livro'}
							</Text>
							<Text>
								<Text as="strong">Ano de lançamento: </Text>
								{new Date(
									mediaSelected.item.release_date ||
										(mediaSelected.item.volumeInfo &&
											mediaSelected.item.volumeInfo.publishedDate) ||
										mediaSelected.item.released
								).getFullYear()}
							</Text>
							<Text>
								<Text as="strong">Descrição: </Text>
								{mediaSelected.item.overview ||
									(mediaSelected.item.volumeInfo && mediaSelected.item.volumeInfo.description) ||
									'Sem descrição'}
							</Text>
						</VStack>
					</Flex>
				)}
				{/* add button */}
				<Button isDisabled={!mediaSelected} variant="styled" width="100%" onClick={addRegister}>
					<Image src={getIcon('add_dark')} w="1.5rem" alt="" mr="2" />
					Marcar {getName(
						mediaTypes.find((el) => el.id === mediaSelected?.type + 1)?.type
					)} como{' '}
					{getConclusion(mediaTypes.find((el) => el.id === mediaSelected?.type + 1)?.type)?.slice(
						0,
						-1
					)}
				</Button>
			</VStack>
		</Modal>
	);
}
