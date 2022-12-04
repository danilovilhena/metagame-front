import { Avatar, Flex, Text, Image } from '@chakra-ui/react';
import Button from 'components/common/Button';
import MediaIcon from 'components/common/MediaIcon';
import { useSelector } from 'react-redux';
import { api } from 'services/api';
import { getTitle } from 'utils/mediaTypes';

export default function PublicGoal({ goal, ...rest }) {
	const mediaTypesArr = useSelector((state) => state.backend.mediaTypes);
	const goalType = mediaTypesArr
		.find((el) => el.id === (goal.mediatype || goal.mediatype_id))
		?.type?.toLowerCase();
	async function handleFavoriteGoal() {
		await api.post('/goals/favorites', {
			goal: goal.id,
		});
	}

	return (
		<Flex
			flexDir="column"
			background="#FFFFFF"
			color="primary"
			minW="50%"
			borderRadius="8px"
			p="3"
			{...rest}
			_dark={{ bg: 'gray.700', color: 'gray.200' }}
		>
			<Flex align="center" justify="space-between" w="100%">
				<Flex align="center">
					<MediaIcon type={goalType} />
					<Text as="strong">{getTitle(goalType, goal)}</Text>
				</Flex>
				<Button variant="unstyled" m="0" px="0" _hover={{}} onClick={() => handleFavoriteGoal()}>
					<Image
						src={`/icons/like${goal.is_liked ? '_active' : ''}.svg`}
						w="1.75rem"
						role="button"
						alt="Descurtir"
					/>
				</Button>
			</Flex>
			<Flex mt="4" alignSelf="flex-end" alignItems="center">
				<Text>
					Criado por <Text as="strong">{goal.creator?.username}</Text>
				</Text>
				<Avatar
					w="2rem"
					h="2rem"
					src={goal.creator?.image_url}
					referrerPolicy="no-referrer"
					name={goal.creator?.username}
					borderRadius="50%"
					ml="4"
				/>
			</Flex>
		</Flex>
	);
}
