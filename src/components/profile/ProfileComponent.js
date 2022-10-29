import { Grid, Flex, Text, Avatar, Icon, Image } from '@chakra-ui/react';
import { Button } from 'components/common/Button';
import { useSession } from 'next-auth/react';
import { TbMovie } from 'react-icons/tb';
import { BsBook } from 'react-icons/bs';
import { Activit } from './Activit';

export function ProfileComponent() {
	const session = useSession();
	const user = session.data;
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
							<Text>Núemro de mídias consumidas</Text>
							<Text as="strong">140</Text>
						</Flex>
						<Flex flexDirection="column">
							<Text>Data de cadastro</Text>
							<Text as="strong">{user.date_joined}</Text>
						</Flex>
						<Flex flexDirection="column" mr="2em">
							<Text>E=mail</Text>
							<Text as="strong">{user.email}</Text>
						</Flex>
						<Flex flexDirection="column">
							<Text>Número de seguidores</Text>
							<Text as="strong">10</Text>
						</Flex>
					</Grid>
				</Flex>
				<Grid gridTemplateColumns="1fr 1fr 1fr" gap="2em">
					<Flex
						background="elementBackground"
						borderRadius="10px"
						alignItems="center"
						height="4.5em"
						padding="1.5em"
					>
						<Flex
							background="red"
							borderRadius="20px"
							width="2.5em"
							height="2.5em"
							alignItems="center"
							justifyContent="center"
							mr="1em"
						>
							<Icon as={TbMovie} color="primary" fontSize="1.5em" />
						</Flex>
						<Text as="strong" mr="0.5em">
							20
						</Text>
						<Text>Filmes assistidos</Text>
					</Flex>
					<Flex
						background="elementBackground"
						borderRadius="10px"
						alignItems="center"
						height="4.5em"
						padding="1.5em"
					>
						<Flex
							background="#4CA4FF"
							borderRadius="20px"
							width="2.5em"
							height="2.5em"
							alignItems="center"
							justifyContent="center"
							mr="1em"
						>
							<Icon as={BsBook} color="primary" fontSize="1.5em" />
						</Flex>
						<Text as="strong" mr="0.5em">
							80
						</Text>
						<Text>Livros lidos</Text>
					</Flex>
					<Flex
						background="elementBackground"
						borderRadius="10px"
						alignItems="center"
						height="4.5em"
						padding="1.5em"
					>
						<Flex
							background="#4CFFB8"
							borderRadius="20px"
							width="2.5em"
							height="2.5em"
							alignItems="center"
							justifyContent="center"
							mr="1em"
						>
							<Image src="/icons/game.svg" color="primary" fontSize="1.5em" />
						</Flex>
						<Text as="strong" mr="0.5em">
							40
						</Text>
						<Text>Jogos concluidos</Text>
					</Flex>
				</Grid>
				<Flex flexDirection="column" marginTop="1.5em">
					<Text as="strong" fontSize="32px" mb="1.5em">
						Ultimos registros
					</Text>
					<Activit />
				</Flex>
			</Flex>
		);
	}
	return <></>;
}
