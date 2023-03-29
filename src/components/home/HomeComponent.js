import { Flex, Grid, Text, Avatar } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PublicGoal from 'components/goals/PublicGoal';
import { fetchPopularGoals, fetchRanking, fetchPopularMedias } from 'store/backend';
import { api } from 'services/api';
import { Media } from 'components/add/AddRegister';

import Link from 'next/link';

export default function HomeComponent() {
	const dispatch = useDispatch();
	const session = useSession();
	const user = session.data;

	const popularGoals = useSelector((state) => state.backend.popularGoals);
	const popularMedias = useSelector((state) => state.backend.popularMedias);

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
		dispatch(fetchPopularMedias());
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
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Text as="h2" fontSize="2xl" fontWeight="medium" mb="4">
						Mídias mais populares
					</Text>
					<Flex gap="4">
						{popularMedias
							.slice(0, 8)
							.filter((el) => !el.is_active)
							.map((media, idx) => (
								<Media
									cursor="default"
									image={
										media.mediatype_id === 1
											? `https://image.tmdb.org/t/p/w500${media.image_on_api}`
											: media.image_on_api
									}
									title={media.name_on_api}
									mediaType={media.mediatype_id}
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
