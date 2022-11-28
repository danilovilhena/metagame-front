import { Grid, Flex, Text, Avatar } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Button from 'components/common/Button';
import MediaIcon from 'components/common/MediaIcon';
import PersonalGoal from './PersonalGoal';
import { useEffect, useState } from 'react';
import { Input } from 'components/common/Input';
import { fetchGoals, fetchUserMedias } from 'store/backend';
import Activity from './Activity';
import PublicGoal from 'components/goals/PublicGoal';

const Title = ({ children }) => (
	<Text as="strong" fontSize="3xl" mb="1.5rem">
		{children}
	</Text>
);

const InputEdit = ({ name, action, value }) => (
	<Input
		name={name}
		value={value}
		placeholder={value}
		background="transparent"
		borderColor="white"
		borderWidth="1px"
		_hover={{ background: 'primary' }}
		mt="2"
		onChange={action}
	/>
);

export default function ProfileComponent({ userProfile = null }) {
	const dispatch = useDispatch();
	const session = useSession();
	const user = userProfile || session.data;

	const mediaTypes = useSelector((state) => state.backend.mediaTypes);
	const userMedias = useSelector((state) => state.backend.userMedias);
	const goals = useSelector((state) => state.backend.goals);
	const [isEdit, setIsEdit] = useState(false);
	const [name, setName] = useState(user ? `${user.first_name} ${user.last_name}` : '');
	const [username, setUsername] = useState(user ? user.username : '');

	useEffect(() => {
		if (user && user.id) {
			dispatch(fetchUserMedias(user.id));
			dispatch(fetchGoals(user.id));
		}
	}, [user, dispatch]);

	const buttons = mediaTypes.map((el) => {
		const labels = { Movie: 'filmes assistidos', Book: 'livros lidos', Game: 'jogos concluídos' };

		return {
			...el,
			type: el.type.toLowerCase(),
			amount: userMedias.filter((media) => media.mediatype === el.id).length,
			label: labels[el.type],
		};
	});

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('pt-BR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	};

	const toggleIsEdit = () => setIsEdit(!isEdit);

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
			>
				<Flex width="100%" justifyContent="space-between" mb="1em">
					<Title>Meu Perfil</Title>
					<Button variant="styled" fontSize="1rem" onClick={toggleIsEdit}>
						{isEdit ? 'Salvar mudanças' : 'Editar Perfil'}
					</Button>
				</Flex>
				<Flex mb="3em">
					<Avatar
						size="2xl"
						src={user.userinfo.image_url}
						referrerPolicy="no-referrer"
						name={user.first_name}
						borderRadius="1rem"
					/>
					<Grid ml="2em" gridTemplateColumns="1fr 1fr" gap="1em">
						<Flex flexDirection="column" mr="2em">
							<Text>Nome</Text>
							{isEdit ? (
								<InputEdit name="name" action={(e) => setName(e.target.value)} value={name} />
							) : (
								<Text as="strong">
									{user.first_name} {user.last_name}
								</Text>
							)}
						</Flex>
						<Flex flexDirection="column">
							<Text>Nome de usuário</Text>
							{isEdit ? (
								<InputEdit
									name="username"
									action={(e) => setUsername(e.target.value)}
									value={username}
								/>
							) : (
								<Text as="strong">{user.username}</Text>
							)}
						</Flex>
						<Flex flexDirection="column" mr="2em">
							<Text>Número de mídias consumidas</Text>
							<Text as="strong">{userMedias.length}</Text>
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
							<Text as="strong">_</Text>
						</Flex>
					</Grid>
				</Flex>
				<Grid gridTemplateColumns="1fr 1fr 1fr" gap="2em" mb="3em">
					{buttons.map((button, idx) => (
						<Flex
							background="tertiary"
							borderRadius="8px"
							alignItems="center"
							height="4.5em"
							padding="1.5em"
							key={idx}
							_dark={{ bg: 'gray.700' }}
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
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Title>Metas atuais</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{userProfile && userProfile.id === session.data.id
							? goals.map((goal, idx) => <PersonalGoal goal={goal} key={idx} />)
							: goals.map((goal, idx) => {
									console.log(goal);
									return <PublicGoal goal={goal} key={idx} />;
							  })}
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
