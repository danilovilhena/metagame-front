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
	useColorMode,
} from '@chakra-ui/react';
import { IoMdSearch } from 'react-icons/io';
import { Button } from 'components/common/Button';
import { signOut, useSession } from 'next-auth/react';
import { getIcon } from 'utils/getIcon';

import { useRouter } from 'next/router';
import Link from 'next/link';

export function HeaderComponent() {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const isLight = colorMode === 'light';
	const session = useSession();
	const user = session.data;

	return (
		<Flex
			as="header"
			justify="space-between"
			px={['1em', '2.5em', '5em']}
			h="5em"
			align="center"
			width="100%"
		>
			<Image src={isLight ? '/logo.svg' : '/logo_dark.svg'} alt="Metagame" />
			<InputGroup
				border="grey"
				color="grey"
				maxWidth="256px"
				alignItems="center"
				_dark={{ color: 'gray.200' }}
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
						{user && user.userinfo && (
							<Avatar
								src={user.userinfo.image_url}
								referrerPolicy="no-referrer"
								name={user.first_name}
								size="sm"
							/>
						)}
					</MenuButton>
					<MenuList minW="fit-content">
						<Link href="/profile">
							<a>
								<MenuItem
									icon={<Image src={getIcon('user', false)} alt="Perfil" />}
									mr="8"
									_dark={{ color: 'gray.200' }}
								>
									Perfil
								</MenuItem>
							</a>
						</Link>
						<MenuItem
							icon={
								<Image
									src={getIcon('moon', false)}
									alt={`Modo ${isLight ? 'escuro' : 'claro'}`}
								/>
							}
							mr="8"
							_dark={{ color: 'gray.200' }}
							onClick={toggleColorMode}
						>
							Modo {isLight ? 'escuro' : 'claro'}
						</MenuItem>
						<Divider opacity="1" my="2" borderBottomWidth="2px" />
						<MenuItem onClick={() => signOut()} _dark={{ color: 'gray.200' }}>
							Sair da conta
						</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		</Flex>
	);
}
