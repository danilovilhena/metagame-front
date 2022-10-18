import {
	Flex,
	Image,
	InputGroup,
	InputLeftElement,
	Input,
	Icon,
	HStack,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Divider,
} from '@chakra-ui/react';
import { IoMdSearch } from 'react-icons/io';
import { Button } from 'components/common/Button';
import { signOut } from 'next-auth/react';

import { useRouter } from 'next/router';

export function HeaderComponent() {
	const router = useRouter();

	const getIcon = (name, condition) =>
		`icons/${name}${condition ? '_active' : ''}.svg`;

	return (
		<Flex
			as="header"
			justify="space-between"
			mx={['1em', '2.5em', '5em']}
			h="5em"
			align="center"
		>
			<Image src="/logo.svg" alt="Metagame" />
			<InputGroup
				border="grey"
				color="grey"
				maxWidth="256px"
				alignItems="center"
			>
				<InputLeftElement pointerEvents="none">
					<Icon boxSize={5} as={IoMdSearch} />
				</InputLeftElement>

				<Input type="text" placeholder="Buscar" fontSize="1em" />
			</InputGroup>
			<HStack color="primary" spacing="0.5em">
				<Button variant="unstyled" mr="0">
					<Image src={getIcon('add', false)} alt="Adicionar" />
				</Button>
				<Button variant="unstyled">
					<Image
						src={getIcon('home', router.pathname === '/home')}
						alt="Início"
					/>
				</Button>
				<Button variant="unstyled">
					<Image
						src={getIcon('hot', router.pathname === '/tops')}
						alt="Metas populares"
					/>
				</Button>
				<Button variant="unstyled">
					<Image
						src={getIcon('goal', router.pathname === '/goals')}
						alt="Minhas metas"
					/>
				</Button>
				<Menu isLazy>
					<MenuButton>
						<Avatar name="Jon Doe" size="sm" />
					</MenuButton>
					<MenuList color="#5F5C6BFF">
						<MenuItem
							icon={<Image src={getIcon('user', false)} alt="Perfil" />}
						>
							Perfil
						</MenuItem>
						<MenuItem
							icon={<Image src={getIcon('moon', false)} alt="Modo escuro" />}
						>
							Modo escuro
						</MenuItem>
						<Divider opacity="1" my="2" borderBottomWidth="2px" />
						<MenuItem onClick={() => signOut()}>Sair da conta</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</Flex>
	);
}
