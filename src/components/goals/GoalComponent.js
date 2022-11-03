import { Grid, Flex, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import PersonalGoal from 'components/profile/PersonalGoal';
import PublicGoal from 'components/goals/PublicGoal';

const Title = ({ children }) => (
	<Text as="strong" fontSize="3xl" mb="1.5rem">
		{children}
	</Text>
);

export default function GoalComponent() {
	const session = useSession();
	const user = session.data;

	const personalGoals = [
		{
			type: 'movie',
			title: 'Assistir 10 filmes em 3 meses',
			duration: '10 dias restantes',
			completion: 50,
		},
		{
			type: 'book',
			title: 'Ler 3 livros em 2 meses',
			duration: '1 mês e 3 dias restantes',
			completion: 33,
		},
		{
			type: 'movie',
			title: 'Assistir 10 filmes em 3 meses',
			duration: '10 dias restantes',
			completion: 50,
		},
		{
			type: 'book',
			title: 'Ler 3 livros em 2 meses',
			completion: 100,
		},
	];

	const publicGoals = [
		{
			type: 'movie',
			title: 'Assistir 10 filmes em 3 meses',
			author: {
				username: '@murilo.couto',
				photo: 'https://avatars.githubusercontent.com/u/4872234?v=4',
			},
			liked: true,
		},
		{
			type: 'movie',
			title: 'Assistir 10 filmes em 3 meses',
			author: {
				username: '@murilo.couto',
				photo: 'https://avatars.githubusercontent.com/u/4872234?v=4',
			},
			liked: true,
		},
	];

	if (user) {
		return (
			<Flex
				flexDirection="column"
				px="6em"
				background="primary"
				color="white"
				pt="1em"
				pb="3em"
				height="100%"
				_dark={{ bg: 'gray.900', color: 'gray.200' }}
			>
				<Flex flexDirection="column" marginTop="1.5em" mb="2rem">
					<Title>Metas atuais</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{personalGoals
							.filter((el) => el.completion !== 100)
							.map((goal, idx) => (
								<PersonalGoal goal={goal} key={idx} />
							))}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="2rem">
					<Title>Metas curtidas</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{publicGoals.map((goal, idx) => (
							<PublicGoal goal={goal} key={idx} />
						))}
					</Grid>
				</Flex>
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Title>Metas concluídas</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{personalGoals
							.filter((el) => el.completion === 100)
							.map((goal, idx) => (
								<PersonalGoal goal={goal} key={idx} />
							))}
					</Grid>
				</Flex>
			</Flex>
		);
	}

	return <></>;
}
