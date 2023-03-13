import { Grid, Flex, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PersonalGoal from 'components/profile/PersonalGoal';
import PublicGoal from 'components/goals/PublicGoal';
import { fetchGoals, fetchPopularMedias } from 'store/backend';
import { api } from 'services/api';
import { Media } from 'components/add/AddRegister';

const Title = ({ children }) => (
	<Text as="strong" fontSize="3xl" mb="1.5rem">
		{children}
	</Text>
);

export default function GoalComponent() {
	const dispatch = useDispatch();
	const session = useSession();
	const user = session.data;

	const goals = useSelector((state) => state.backend.goals);
	const favoriteGoals = useSelector((state) => state.backend.favoriteGoals);
	const popularMedias = useSelector((state) => state.backend.popularMedias);
	async function handleFavoriteGoal(id) {
		await api
			.post('/goals/favorites', {
				goal: id,
			})
			.then(() => dispatch(fetchGoals(user.id)));
	}

	useEffect(() => {
		if (user && user.id) {
			dispatch(fetchGoals(user.id));
			dispatch(fetchPopularMedias());
		}
	}, [user]);

	if (user) {
		return (
			<Flex
				flexDirection="column"
				px="6em"
				background="primary"
				color="white"
				pt="1em"
				pb="3em"
				flex="1"
				_dark={{ bg: 'gray.900', color: 'gray.200' }}
			>
				<Flex flexDirection="column" marginTop="1.5em" mb="2rem">
					<Title>Metas atuais</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{goals
							.filter((el) => el.is_active)
							.map((goal, idx) => (
								<PersonalGoal goal={goal} key={idx} handleFavoriteGoal={handleFavoriteGoal} />
							))}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="2rem">
					<Title>Metas curtidas</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{favoriteGoals.map((goal, idx) => (
							<PublicGoal
								goal={{ ...goal, is_liked: true }}
								handleFavoriteGoal={handleFavoriteGoal}
								key={idx}
							/> // this element still needs update (after we favorite it)
						))}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Title>Metas finalizadas</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{goals
							.filter((el) => !el.is_active)
							.map((goal, idx) => (
								<PersonalGoal goal={goal} handleFavoriteGoal={handleFavoriteGoal} key={idx} />
							))}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Title>Mídias mais populares</Title>
					<Flex gap="4">
						{popularMedias
							.slice(0, 8)
							.filter((el) => !el.is_active)
							.map((media, idx) => (
								<Media
									image={
										media.mediatype_id === 1
											? `https://image.tmdb.org/t/p/w500${media.image_on_api}`
											: media.image_on_api
									}
									title={media.name}
									key={idx}
								/>
							))}
					</Flex>
				</Flex>
			</Flex>
		);
	}

	return <></>;
}
