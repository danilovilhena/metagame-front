import { VStack, Image, Flex, Text } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import { Input } from 'components/common/Input';
import { useEffect, useState } from 'react';
import { useMedias } from 'contexts/MediasContext';

export default function AddRegister({ isModalOpen, setIsModalOpen }) {
	const { medias, getCover, getCoverTitle } = useMedias();
	const [searchInput, setSearchInput] = useState('');
	const [mediaSelected, setMediaSelected] = useState(null);
	const [filtredMedias, setFiltredMedias] = useState(null);

	useEffect(() => {
		if (searchInput) {
			const delayDebounceFn = setTimeout(async () => {
				let res = null;
				let response = null;
				let data = {};

				// res = await fetch(
				// 	`https://api.themoviedb.org/3/discover/movie/?api_key=${
				// 		process.env.NEXT_PUBLIC_TMDB
				// 	}&language=pt-BR&sort_by=popularity.desc&vote_average.gte=7&include_adult=false&include_video=false&page=${
				// 		Math.random() * 25
				// 	}`
				// );
				// response = await res.json();
				// data = { movies: response.results.slice(0, max_movies) };
				data = { movies: [] };
				// Games
				res = await fetch(
					`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG}&maxResults=10&search=${searchInput}`
				);
				response = await res.json();
				data = { ...data, games: response.results };

				// Books
				res = await fetch(
					`https://www.googleapis.com/books/v1/volumes?orderBy=relevance&filter=paid-ebooks&&page_size=10&q=${searchInput}`
				);
				response = await res.json();

				data = { ...data, books: response.items };

				setFiltredMedias(data);
			}, 3000);

			return () => clearTimeout(delayDebounceFn);
		} else {
			setFiltredMedias(null);
		}
	}, [searchInput]);

	useEffect(() => {
		console.log(filtredMedias);
	}, [filtredMedias]);

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
				<Input
					placeholder="Buscar por filmes, livros ou jogos"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Flex
					wrap="wrap"
					gap="20px"
					justifyContent="center"
					overflow="auto"
					height="400px"
					maxH="600px"
				>
					{searchInput ? (
						filtredMedias ? (
							Object.values(filtredMedias).map((medias, idx) => {
								return medias.map((media) => (
									<Flex
										as="button"
										flexDirection="column"
										alignItems="center"
										onClick={() => setMediaSelected({ type: idx, item: media })}
										key={media.id}
									>
										<Image
											width="120px"
											height="180px"
											objectFit="cover"
											borderRadius="10px"
											alt="cover"
											mb="0.5em"
											boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
											src={getCover(idx, media)}
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
											{getCoverTitle(idx, media)}
										</Text>
									</Flex>
								));
							})
						) : (
							<Text fontWeight="bold" alignSelf="center">
								Mídia não encontrada
							</Text>
						)
					) : (
						[...Array(10)].map((_, idx) => {
							// Counting from 0 to 2
							const mediaIndex = idx % 3;
							const currentMediaType = Object.values(medias)[mediaIndex];
							if (currentMediaType) {
								return (
									<Flex
										as="button"
										flexDirection="column"
										alignItems="center"
										onClick={() =>
											setMediaSelected({ type: mediaIndex, item: currentMediaType[idx] })
										}
										key={idx}
									>
										<Image
											width="120px"
											height="180px"
											objectFit="cover"
											borderRadius="10px"
											alt="cover"
											mb="0.5em"
											boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
											src={getCover(mediaIndex, currentMediaType[idx])}
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
											{getCoverTitle(mediaIndex, currentMediaType[idx])}
										</Text>
									</Flex>
								);
							}
							return <></>;
						})
					)}
				</Flex>
				{mediaSelected && (
					<VStack spacing="1em" alignItems="start">
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
									(mediaSelected.item.volumeInfo && mediaSelected.item.volumeInfo.publishedDate) ||
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
				)}
				<Button
					isDisabled={!mediaSelected}
					variant="styled"
					width="100%"
					onClick={() => {
						setIsModalOpen(false);
					}}
				>
					<Image src={getIcon('add_dark')} w="1.5rem" alt="" mr="2" />
					Marcar filme como assistido
				</Button>
			</VStack>
		</Modal>
	);
}
