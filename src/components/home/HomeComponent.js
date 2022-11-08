import { Flex, Grid, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import PublicGoal from 'components/goals/PublicGoal';

export default function HomeComponent() {
	const session = useSession();
	const user = session.data;

	const publicGoals = Array(10).fill({
		type: 'movie',
		title: 'Assistir 10 filmes em 3 meses',
		author: {
			username: '@murilo.couto',
			photo: 'https://avatars.githubusercontent.com/u/4872234?v=4',
		},
		liked: false,
	});

	if (user) {
		return (
			<Flex
				flexDirection="column"
				px="6em"
				background="primary"
				color="white"
				py="3em"
				height="100%"
				_dark={{ bg: 'gray.900', color: 'gray.200' }}
				minH="calc(100vh - 10rem)"
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
					{publicGoals.map((goal, idx) => (
						<PublicGoal goal={goal} key={idx} />
					))}
				</Grid>
			</Flex>
		);
	}
	return <></>;
}
