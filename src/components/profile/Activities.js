import { Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'services/api';
import mediaTypes from 'utils/mediaTypes';
import { capitalize } from 'utils/functions';

export default function Activities({ userProfile = null }) {
	const userMedias = useSelector((state) => state.backend.userMedias);
	const [activities, setActivities] = useState(null);
	const user = userProfile;

	const getActivitiesText = (item) => {
		const content = Object.keys(mediaTypes)[item.mediatype - 1];
		if (content) {
			return (
				<>
					<Text as="strong" mx="0.3em" color="secondary">
						{capitalize(mediaTypes[content].name)}
					</Text>
					{mediaTypes[content].conclusion.slice(0, -1)} no dia
					<Text as="strong" mx="0.3em" color="secondary">
						{item.register_date}
					</Text>
				</>
			);
		}
	};

	useEffect(() => {
		async function getActivities() {
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
				setActivities(formatedResponse);
			});
		}
		getActivities();
	}, [userMedias]);

	if (!activities) return <></>;
	console.log('Entrei');

	return (
		<SimpleGrid columns="2" spacing="4">
			{activities.map((item, idx) => (
				<Flex
					justifyContent="space-between"
					alignItems="center"
					bg="#FFF"
					color="primary"
					_dark={{ bg: 'gray.700', color: 'gray.200' }}
					borderRadius="10px"
					p="3"
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
							{getActivitiesText(item)}
						</Text>
					</Flex>
				</Flex>
			))}
		</SimpleGrid>
	);
}
