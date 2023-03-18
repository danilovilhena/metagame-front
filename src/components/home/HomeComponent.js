import { Flex, Grid, Text, Avatar } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PublicGoal from 'components/goals/PublicGoal';
import { fetchPopularGoals, fetchRanking } from 'store/backend';
import { api } from 'services/api';
import Link from 'next/link';

export default function HomeComponent() {
	const dispatch = useDispatch();
	const session = useSession();
	const user = session.data;

	const popularGoals = useSelector((state) => state.backend.popularGoals);
	const ranking = useSelector((state) => state.backend.ranking);

	async function handleFavoriteGoal(id) {
		await api
			.post('/goals/favorites', {
				goal: id,
			})
			.then(() => dispatch(fetchPopularGoals(user.id)));
	}

	useEffect(() => {
		dispatch(fetchPopularGoals());
		dispatch(fetchRanking());
	}, [dispatch]);

	if (user) {
		return (
			<Flex
				flexDirection="column"
				flex="1"
				px="6em"
				background="primary"
				color="white"
				py="3em"
				_dark={{ bg: 'gray.900', color: 'gray.200' }}
			>
				<Text as="h1" fontSize="3xl" fontWeight="bold">
					Olá,{' '}
					<Text color="secondary" as="span">
						{user.first_name}
					</Text>
					!
				</Text>
				<Text as="h2" fontSize="2xl" fontWeight="medium" mb="4">
					🔥 Conheça metas populares entre outros usuários
				</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap="8" mb="3em">
					{popularGoals.map((goal, idx) => (
						<PublicGoal handleFavoriteGoal={handleFavoriteGoal} goal={goal} key={idx} />
					))}
				</Grid>
				<Text as="h2" fontSize="2xl" fontWeight="medium" mb="4">
					🏆 Descubra os principais usuários do Metagame!
				</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap="8" mb="3em">
					{ranking.map((user, idx) => (
						<Flex
							flexDir="row"
							alignItems="center"
							justifyContent="space-between"
							background="#FFFFFF"
							color="primary"
							minW="50%"
							borderRadius="8px"
							p="3"
							fontWeight="bold"
							_dark={{ bg: 'gray.700', color: 'gray.200' }}
							key={idx}
						>
							<Flex alignItems="center">
								<Avatar
									w="2rem"
									h="2rem"
									src={user?.image_url}
									referrerPolicy="no-referrer"
									name={user?.username}
									borderRadius="50%"
									mr="4"
								/>
								<Link href={`/profile/${user.username}`}>
									<Text cursor="pointer">{user.username}</Text>
								</Link>
							</Flex>
							<Text color="secondary">
								{user.points} {user.points === 1 ? 'ponto' : 'pontos'}
							</Text>
						</Flex>
					))}
				</Grid>
			</Flex>
		);
	}
	return <></>;
}
