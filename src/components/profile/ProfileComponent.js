import { useEffect, useState } from 'react';
import { Grid, Flex, Text, Avatar, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Button from 'components/common/Button';
import MediaIcon from 'components/common/MediaIcon';
import PersonalGoal from 'components/profile/PersonalGoal';
import { Input } from 'components/common/Input';
import Activities from 'components/profile/Activities';
import PublicGoal from 'components/goals/PublicGoal';
import Charts from 'components/profile/Charts';
import { fetchGoals, fetchUserMedias } from 'store/backend';
import { formatDate } from 'utils/functions';
import showToast from 'utils/showToast';
import { api } from 'services/api';

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
	const toast = useToast();
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
			setName(`${user.first_name} ${user.last_name}`);
			setUsername(user.username);
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

	const toggleIsEdit = async () => {
		const hasChanged =
			username !== user.username || name !== `${user.first_name} ${user.last_name}`;
		if (isEdit && hasChanged) {
			const nameArr = name.split(' ');
			api
				.put(`/users/${user.id}`, {
					username: username,
					email: user.email,
					first_name: nameArr ? nameArr[0] : user.first_name,
					last_name: nameArr ? nameArr[nameArr.length - 1] : user.last_name,
					provider: user.userinfo.provider,
					image_url: user.userinfo.image_url,
					password: '',
				})
				.then(() => {
					showToast(toast, 'Perfil editado com sucesso!', 'success');
				})
				.catch((err) => {
					showToast(toast, `${err?.response?.data?.error}.` || 'Erro ao editar perfil!', 'error');
				});
		}
		setIsEdit(!isEdit);
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
								<Text as="strong">{name}</Text>
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
								<Text as="strong">{username}</Text>
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
				{/* mídias consumidas */}
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
				{/* gráficos */}
				{user && user.id === session.data.id && <Charts />}
				{/* metas atuais */}
				<Flex flexDirection="column" marginTop="1.5em" mb="3rem">
					<Title>Metas atuais</Title>
					<Grid templateColumns="repeat(2, 1fr)" gap="4">
						{goals
							.filter((goal) => !goal.is_done)
							.map((goal, idx) => {
								return user && user.id === session.data.id ? (
									<PersonalGoal goal={goal} key={idx} />
								) : (
									<PublicGoal goal={goal} key={idx} />
								);
							})}
					</Grid>
				</Flex>
				{/* últimos registros */}
				<Flex flexDirection="column" marginTop="1.5em">
					<Title>Últimos registros</Title>
					<Activities />
				</Flex>
			</Flex>
		);
	}
	return <></>;
}
