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
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import AddModal from 'components/add/AddModal';

export default function HeaderLoggedIn({ user }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const isLight = colorMode === 'light';

	const buttons = [
		{ icon: 'add', alt: 'Adicionar', action: () => setIsModalOpen(true) },
		{ icon: 'home', alt: 'Início', route: '/home', action: () => {} },
		{ icon: 'goal', alt: 'Minhas metas', route: '/goals', action: () => {} },
	];

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
				borderColor="primary"
				color="primary"
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
				{buttons.map((btn, idx) => (
					<Button variant="unstyled" mr="0" key={idx} onClick={btn.action}>
						<Link href={btn.route || ''}>
							<Image
								src={getIcon(btn.icon, router.pathname === btn.route)}
								alt={btn.alt}
							/>
						</Link>
					</Button>
				))}
				<Menu isLazy>
					<MenuButton ml="1rem !important">
						{user && user.userinfo && (
							<Avatar
								src={user.userinfo.image_url}
								referrerPolicy="no-referrer"
								name={user.first_name}
								size="sm"
								outline={router.pathname === '/profile' ? '2px solid' : ''}
								outlineColor="secondary"
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
						<MenuItem
							onClick={() => signOut({ callbackUrl: '/' })}
							_dark={{ color: 'gray.200' }}
						>
							Sair da conta
						</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
			<AddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</Flex>
	);
}
