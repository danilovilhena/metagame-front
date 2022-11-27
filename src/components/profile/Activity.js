import { Flex, Image, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'services/api';
import getIcon from 'utils/getIcon';

export default function Activity() {
	const userMedias = useSelector((state) => state.backend.userMedias);
	const [activity, setActivity] = useState(null);
	const session = useSession();
	const user = session.data;
	const labels = {
		Movie: {
			text_highlight: 'Filme',
			verb: 'assistido',
		},
		Game: {
			text_highlight: 'Jogo',
			verb: 'concluido',
		},
		Book: {
			text_highlight: 'Livro',
			verb: 'lido',
		},
	};

	function getActivityText(item) {
		const content = Object.values(labels)[item.mediatype - 1];
		if (content) {
			return (
				<>
					<Text as="strong" mx="0.3em" color="secondary">
						{content.text_highlight}
					</Text>
					{content.verb} no dia
					<Text as="strong" mx="0.3em" color="secondary">
						{item.register_date}
					</Text>
				</>
			);
		}
	}

	useEffect(() => {
		async function getActivity() {
			await api.get(`/medias/user/${user.id}`).then((response) => {
				const formatedResponse = response.data.map((item) => {
					return {
						...item,
						register_date: new Date(item.register_date).toLocaleDateString('pt-BR', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
						}),
					};
				});
				setActivity(formatedResponse);
			});
		}
		getActivity();
	}, [userMedias]);

	if (!activity) {
		return <></>;
	}

	return (
		<Flex
			flexDirection="column"
			maxW="80%"
			color="primary"
			_dark={{ bg: 'gray.700', color: 'gray.200' }}
		>
			{activity.map((item, idx) => (
				<Flex
					justifyContent="space-between"
					alignItems="center"
					marginBottom="30px"
					background="#FFFFFF"
					borderRadius="10px"
					p="3"
					mb="1em"
					key={idx}
				>
					<Flex>
						<Image
							width="70px"
							height="80px"
							objectFit="cover"
							borderRadius="10px"
							src={
								item.mediatype === 1
									? `https://image.tmdb.org/t/p/w500${item.image_on_api}`
									: item.image_on_api
							}
							mr="1em"
							alt="Banner"
						/>
						<Text display="flex" alignItems="center">
							{getActivityText(item)}
						</Text>
					</Flex>
					<Flex>
						<Button variant="unstyled" px="0" _hover={{ _dark: { backgroundColor: 'gray.600' } }}>
							<Image src={getIcon('edit')} alt="Editar atividade" />
						</Button>
						<Button
							variant="unstyled"
							margin="0"
							px="0"
							_hover={{ _dark: { backgroundColor: 'gray.600' } }}
						>
							<Image src={getIcon('trash')} alt="Deletar atividade" />
						</Button>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
}
