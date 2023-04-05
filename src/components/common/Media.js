import { Flex, Text, VStack, Image, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMediaColor } from 'utils/getMediaColor';
import { getConclusion, getName } from 'utils/mediaTypes';
import Modal from './Modal';
import Button from './Button';
import getIcon from 'utils/getIcon';
import { api } from 'services/api';
import showToast from 'utils/showToast';
import { fetchGoals, fetchUserMedias } from 'store/backend';
import { useSession } from 'next-auth/react';

const fetchMovie = async (id) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB}&language=pt-BR&external_source=imdb_id`
	);
	const response = await res.json();
	return {
		name_on_api: response.title,
		description: response.overview,
		image_on_api: `https://image.tmdb.org/t/p/w500${
			response.poster_path || response.backdrop_path
		}`,
		id_on_api: response.id,
		releaseDate: response.release_date,
	};
};
const fetchGame = async (id) => {
	const res = await fetch(
		`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG}&language=pt-BR`
	);
	const response = await res.json();
	return {
		name_on_api: response.name,
		description: response.description,
		image_on_api: response.background_image,
		id_on_api: response.id,
		releaseDate: response.released,
	};
};

const fetchBook = async (id) => {
	const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
	const response = await res.json();
	return {
		name_on_api: response?.volumeInfo?.title,
		description: response?.volumeInfo?.description,
		image_on_api: response?.volumeInfo?.imageLinks?.thumbnail,
		id_on_api: response.id,
		releaseDate: response?.volumeInfo?.publishedDate,
	};
};

export const Media = ({ showBorder = false, showShadow = true, media, ...rest }) => {
	const toast = useToast();
	const dispatch = useDispatch();
	const session = useSession();
	const [isMediaDetailOpen, setIsMediaDetalOpen] = useState(false);
	const [mediaFullContent, setMediaFullContent] = useState(null);
	const mediaTypes = useSelector((state) => state.backend.mediaTypes);
	const mediaType = mediaTypes.find((mediaType) => mediaType.id == media.mediatype_id)?.type;
	const addButtonText = `Marcar ${getName(mediaType)} como ${getConclusion(mediaType)}`;

	useEffect(() => {
		if (isMediaDetailOpen) {
			if (media.mediatype_id === 1) {
				fetchMovie(media.id_on_api).then((res) => setMediaFullContent(res));
			}
			if (media.mediatype_id === 2) {
				fetchGame(media.id_on_api).then((res) => setMediaFullContent(res));
			}
			if (media.mediatype_id === 3) {
				fetchBook(media.id_on_api).then((res) => setMediaFullContent(res));
			}
		}
	}, [isMediaDetailOpen, media.id_on_api, media.mediatype_id]);

	const addRegister = async () => {
		api
			.post('/medias', {
				mediatype: media.mediatype_id,
				name_on_api: media.name_on_api,
				id_on_api: media.id_on_api,
				image_on_api:
					media.mediatype_id === 3
						? `https://image.tmdb.org/t/p/w500${media.image_on_api}`
						: media.image_on_api,
			})
			.then(() => {
				showToast(toast, 'Mídia adicionada com sucesso!', 'success');
				setIsMediaDetalOpen(false);
				dispatch(fetchUserMedias(session.data.id));
				dispatch(fetchGoals(session.data.id));
			})
			.catch((err) => {
				console.log(err);
				showToast(toast, `${err?.response?.data?.error}.` || 'Erro ao adicionar mídia!', 'error');
			});
	};

	return (
		<>
			<Flex
				as="button"
				flexDirection="column"
				alignItems="center"
				padding="0.5rem"
				borderRadius="20px"
				border={showBorder && 'solid 2px var(--chakra-colors-secondary)'}
				onClick={() => setIsMediaDetalOpen(true)}
				{...rest}
			>
				<Image
					loading="lazy"
					width="120px"
					height="180px"
					objectFit="cover"
					borderRadius="10px"
					alt="cover"
					mb="0.5em"
					boxShadow={showShadow ? getMediaColor(media.mediatype_id) : 'lg'}
					_dark={showShadow && { boxShadow: getMediaColor(media.mediatype_id) }}
					src={media.image_on_api}
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
					{media.name_on_api}
				</Text>
			</Flex>
			<Modal
				variant="unstyled"
				ModalTitle="Adicionar"
				isOpen={isMediaDetailOpen}
				setIsOpen={setIsMediaDetalOpen}
				modalSize="xl"
			>
				<Flex w="100%" flexDir="row">
					<Button variant="unstyled" mr=".5rem" onClick={() => setIsMediaDetalOpen(false)} px="0">
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
						src={media.image_on_api}
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
							{media.name_on_api}
						</Text>
						<Text>
							<Text as="strong">Categoria: </Text>
							{{ 1: 'Filme', 2: 'Jogo', 3: 'Livro' }[media.mediatype_id]}
						</Text>
						<Text>
							<Text as="strong">Ano de lançamento: </Text>
							{new Date(mediaFullContent?.releaseDate).getFullYear()}
						</Text>
						<Text>
							<Text as="strong">Descrição: </Text>
							<Text
								as="span"
								dangerouslySetInnerHTML={{
									__html: mediaFullContent?.description || 'Sem descrição',
								}}
							/>
						</Text>
					</VStack>
				</Flex>
				{/* add button */}
				<Button variant="styled" width="100%" onClick={addRegister} my="1rem">
					<Image src={getIcon('add')} w="1.5rem" alt="" mr="2" />
					{addButtonText}
				</Button>
			</Modal>
		</>
	);
};
