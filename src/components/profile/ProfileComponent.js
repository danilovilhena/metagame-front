import { Grid, Flex, Text, Avatar } from '@chakra-ui/react';
import { Button } from 'components/common/Button';
import { MediaIcon } from 'components/common/MediaIcon';
import { useSession } from 'next-auth/react';
import { Activity } from './Activity';
import { PersonalGoal } from './PersonalGoal';

const Title = ({ children }) => (
	<Text as="strong" fontSize="3xl" mb="1.5em">
		{children}
	</Text>
);

export function ProfileComponent() {
	const session = useSession();
	const user = session.data;

	const buttons = [
		{ type: 'movie', amount: '20', label: 'filmes assistidos' },
		{ type: 'book', amount: '80', label: 'livros lidos' },
		{ type: 'game', amount: '40', label: 'jogos concluídos' },
	];

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

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('pt-BR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	};

	if (user) {
		return (
			<Flex
				flexDirection="column"
				px="6em"
				background="primary"
				color="white"
				py="3em"
				height="100%"
			>
				<Flex width="100%" justifyContent="space-between" mb="3em">
					<Title>Meu Perfil</Title>
					<Button variant="styled" fontSize="18px">
						Editar Perfil
					</Button>
				</Flex>
				<Flex mb="3em">
					<Avatar
						size="2xl"
						src={user.userinfo.image_url}
						referrerPolicy="no-referrer"
						name={user.first_name}
					/>
					<Grid ml="2em" gridTemplateColumns="1fr 1fr" gap="1em">
						<Flex flexDirection="column" mr="2em">
							<Text>Nome</Text>
							<Text as="strong">
								{user.first_name} {user.last_name}
							</Text>
						</Flex>
						<Flex flexDirection="column">
							<Text>Nome de usuário</Text>
							<Text as="strong">{user.username}</Text>
						</Flex>
						<Flex flexDirection="column" mr="2em">
							<Text>Número de mídias consumidas</Text>
							<Text as="strong">140</Text>
						</Flex>
						<Flex flexDirection="column">
							<Text>Data de cadastro</Text>
							<Text as="strong">{formatDate(user.date_joined)}</Text>
						</Flex>
						<Flex flexDirection="column" mr="2em">
							<Text>E-mail</Text>
							<Text as="strong">{user.email}</Text>
						</Flex>
						<Flex flexDirection="column">
							<Text>Número de seguidores</Text>
							<Text as="strong">10</Text>
						</Flex>
					</Grid>
				</Flex>
				<Grid gridTemplateColumns="1fr 1fr 1fr" gap="2em">
					{buttons.map((button, idx) => (
						<Flex
							background="elementBackground"
							borderRadius="8px"
							alignItems="center"
							height="4.5em"
							padding="1.5em"
							key={idx}
						>
							<MediaIcon type={button.type} />
							<Text as="strong" mr="0.25em" fontSize="3xl">
								{button.amount}
							</Text>
							<Text>{button.label}</Text>
						</Flex>
					))}
				</Grid>
				{/* metas atuais */}
				<Flex flexDirection="column" marginTop="1.5em">
					<Title>Metas atuais</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{personalGoals.map((goal, idx) => (
							<PersonalGoal goal={goal} key={idx} />
						))}
					</Grid>
				</Flex>
				{/* últimos registros */}
				<Flex flexDirection="column" marginTop="1.5em">
					<Title>Últimos registros</Title>
					<Activity />
				</Flex>
			</Flex>
		);
	}
	return <></>;
}
