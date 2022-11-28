import { Flex, Grid, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PublicGoal from 'components/goals/PublicGoal';
import { fetchPopularGoals } from 'store/backend';

export default function HomeComponent() {
	const dispatch = useDispatch();
	const session = useSession();
	const user = session.data;

	const popularGoals = useSelector((state) => state.backend.popularGoals);

	useEffect(() => {
		dispatch(fetchPopularGoals());
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
				<Text as="h2" fontSize="2xl" fontWeight="medium" mb="12">
					Conheça metas populares entre outros usuários 🔥
				</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap="8" mb="3em">
					{popularGoals.map((goal, idx) => (
						<PublicGoal goal={goal} key={idx} />
					))}
				</Grid>
			</Flex>
		);
	}
	return <></>;
}
