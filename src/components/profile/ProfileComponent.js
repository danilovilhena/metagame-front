import { Grid, Flex, Text, Avatar, Image } from '@chakra-ui/react';
import { Button } from 'components/common/Button';
import { useSession } from 'next-auth/react';
import { Activity } from './Activity';

export function ProfileComponent() {
	const session = useSession();
	const user = session.data;

	const buttons = [
		{
			icon: '/icons/movie.svg',
			amount: '20',
			label: 'filmes assistidos',
			background: '#FF4C4D',
		},
		{
			icon: '/icons/book.svg',
			amount: '80',
			label: 'livros lidos',
			background: '#4CA4FF',
		},
		{
			icon: '/icons/game.svg',
			amount: '40',
			label: 'jogos concluídos',
			background: '#4CFFB8',
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
					<Text as="strong" fontSize="32px">
						Meu Perfil
					</Text>
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
							<Flex
								background={button.background}
								borderRadius="4px"
								width="2.5em"
								height="2.5em"
								alignItems="center"
								justifyContent="center"
								mr="1em"
							>
								<Image src={button.icon} color="primary" fontSize="1.5em" />
							</Flex>
							<Text as="strong" mr="0.25em" fontSize="3xl">
								{button.amount}
							</Text>
							<Text>{button.label}</Text>
						</Flex>
					))}
				</Grid>
				<Flex flexDirection="column" marginTop="1.5em">
					<Text as="strong" fontSize="32px" mb="1.5em">
						Últimos registros
					</Text>
					<Activity />
				</Flex>
			</Flex>
		);
	}
	return <></>;
}
