import { Grid, Flex, Text, Skeleton, useBreakpointValue } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PersonalGoal from 'components/profile/PersonalGoal';
import PublicGoal from 'components/goals/PublicGoal';
import { fetchGoals, fetchPopularMedias } from 'store/backend';
import { api } from 'services/api';

const Title = ({ children }) => (
	<Text as="strong" fontSize="3xl" mb="1.5rem">
		{children}
	</Text>
);

export default function GoalComponent() {
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const dispatch = useDispatch();
	const session = useSession();
	const user = session.data;

	const goals = useSelector((state) => state.backend.goals);
	const favoriteGoals = useSelector((state) => state.backend.favoriteGoals);
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
	}, [user, dispatch]);

	if (user) {
		return (
			<Flex
				flexDirection="column"
				px={['2em', '6em']}
				background="primary"
				color="white"
				pt="1em"
				pb="3em"
				flex="1"
				_dark={{ bg: 'gray.900', color: 'gray.200' }}
			>
				<Flex flexDirection="column" marginTop="1.5em" mb="2rem">
					<Title>Metas atuais</Title>
					<Grid templateColumns={isWideVersion ? 'repeat(2, 1fr)' : '1fr'} gap="4">
						{!goals ? (
							<>
								<Skeleton height="80px" width="100%" borderRadius="10px" />
								<Skeleton height="80px" width="100%" borderRadius="10px" />
							</>
						) : goals.length > 0 ? (
							goals
								.filter((el) => el.is_active)
								.map((goal, idx) => (
									<PersonalGoal goal={goal} key={idx} handleFavoriteGoal={handleFavoriteGoal} />
								))
						) : (
							<Text as="h3" fontSize="xl" fontWeight="medium" mb="4">
								Nenhuma meta sendo feita no momento
							</Text>
						)}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="2rem">
					<Title>Metas curtidas</Title>
					<Grid templateColumns={isWideVersion ? 'repeat(2, 1fr)' : '1fr'} gap="4">
						{!favoriteGoals ? (
							<>
								<Skeleton height="80px" width="100%" borderRadius="10px" />
								<Skeleton height="80px" width="100%" borderRadius="10px" />
							</>
						) : favoriteGoals.length > 0 ? (
							favoriteGoals.map((goal, idx) => (
								<PublicGoal
									goal={{ ...goal, is_liked: true }}
									handleFavoriteGoal={handleFavoriteGoal}
									key={idx}
								/> // this element still needs update (after we favorite it)
							))
						) : (
							<Text as="h3" fontSize="xl" fontWeight="medium" mb="4">
								Nenhuma meta favoritada
							</Text>
						)}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Title>Metas finalizadas</Title>
					<Grid templateColumns={isWideVersion ? 'repeat(2, 1fr)' : '1fr'} gap="4">
						{!goals ? (
							<>
								<Skeleton height="80px" width="100%" borderRadius="10px" />
								<Skeleton height="80px" width="100%" borderRadius="10px" />
							</>
						) : goals.length > 0 ? (
							goals
								.filter((el) => !el.is_active)
								.map((goal, idx) => (
									<PersonalGoal goal={goal} handleFavoriteGoal={handleFavoriteGoal} key={idx} />
								))
						) : (
							<Text as="h3" fontSize="xl" fontWeight="medium" mb="4">
								Nenhuma meta finalizada ainda
							</Text>
						)}
					</Grid>
				</Flex>
			</Flex>
		);
	}

	return <></>;
}
