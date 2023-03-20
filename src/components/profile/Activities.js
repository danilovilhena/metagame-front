import { Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'services/api';
import mediaTypes from 'utils/mediaTypes';
import { capitalize } from 'utils/functions';

// const color = item.mediatype === 1 ? "#FF4C4D" : item.mediatype === 2 ? "#4CFFB8" : "#4CA4FF"

export default function Activities({ userProfile = null }) {
	const userMedias = useSelector((state) => state.backend.userMedias);
	const [activities, setActivities] = useState(null);
	const user = userProfile;

	function getMediaColor(mediaType) {
		if (mediaType === 1) {
			return 'rgba(255, 76, 77, 0.75) 0px 6px 20px -4px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px';
		}
		if (mediaType === 2) {
			return 'rgba(76, 255, 184, 0.75) 0px 6px 20px -4px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px';
		}
		if (mediaType === 3) {
			return 'rgba(76, 164, 255, 0.75) 0px 6px 20px -4px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px';
		}

		return 'dark-lg';
	}

	const getActivitiesText = (item) => {
		const content = Object.keys(mediaTypes)[item.mediatype - 1];

		if (content) {
			return (
				<>
					<Text as="strong" mx="0.3em" color="secondary">
						{capitalize(item.name_on_api)}
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

	return (
		<SimpleGrid columns="2" spacing="4">
			{activities.map((item, idx) => (
				<Flex
					justifyContent="space-between"
					alignItems="center"
					bg="white"
					color="primary"
					boxShadow={getMediaColor(item.mediatype)}
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
