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
	useBreakpointValue,
	VStack,
} from '@chakra-ui/react';
import { IoMdSearch } from 'react-icons/io';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import AddModal from 'components/add/AddModal';
import AddGoal from 'components/add/AddGoal';
import AddRegister from 'components/add/AddRegister';
import SideBarDrawer from 'components/index/SideBarDrawer';

export default function HeaderLoggedIn({ user }) {
	const router = useRouter();
	const [search, setSearch] = useState(router.asPath.split('/search/')[1] || '');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);
	const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const [callOnClose, setCallOnClose] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode();
	const isLight = colorMode === 'light';

	useEffect(() => {
		if (!router.asPath.includes('search')) setSearch('');
	}, [router.asPath]);

	const closeAllModals = () => {
		setIsAddModalOpen(false);
		setIsAddMediaModalOpen(false);
		setIsAddGoalModalOpen(false);
	};

	const buttons = [
		{
			icon: 'add',
			alt: 'Adicionar',
			action: () => setIsAddModalOpen(true),
		},
		{ icon: 'home', alt: 'Início', route: '/home', action: null },
		{ icon: 'goal', alt: 'Minhas metas', route: '/goals', action: null },
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
			<Link href="/home">
				<Image
					src={isLight ? '/logo.svg' : '/logo_dark.svg'}
					alt="Metagame"
					cursor="pointer"
					width={['120px', 'auto']}
				/>
			</Link>
			<InputGroup
				borderColor="primary"
				color="primary"
				maxWidth={['128px', '256px']}
				alignItems="center"
				_dark={{ color: 'gray.200', borderColor: 'gray.600' }}
			>
				<InputLeftElement
					cursor="pointer"
					onClick={() => {
						router.push(`/search/${search}`);
					}}
				>
					<Icon boxSize={5} as={IoMdSearch} />
				</InputLeftElement>

				<Input
					type="text"
					placeholder="Buscar"
					fontSize="1em"
					value={search}
					onInput={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							router.push(`/search/${search}`);
						}
					}}
				/>
			</InputGroup>
			{isWideVersion ? (
				<HStack color="primary" spacing="0.5em">
					{buttons.map((btn, idx) => (
						<Link href={btn.route || ''} key={idx}>
							<a>
								<Button variant="unstyled" mr="0" onClick={btn.action} padding={0}>
									<Image src={getIcon(btn.icon, router.pathname === btn.route)} alt={btn.alt} />
								</Button>
							</a>
						</Link>
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
								<MenuItem
									icon={<Image src={getIcon('user', false)} alt="Perfil" />}
									mr="8"
									_dark={{ color: 'gray.200' }}
								>
									Perfil
								</MenuItem>
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
							<MenuItem onClick={() => signOut({ callbackUrl: '/' })} _dark={{ color: 'gray.200' }}>
								Sair da conta
							</MenuItem>
						</MenuList>
					</Menu>
				</HStack>
			) : (
				<SideBarDrawer callOnClose={callOnClose} setCallOnClose={setCallOnClose}>
					<VStack
						as="nav"
						fontSize="1.5rem"
						alignItems="start"
						mt="50px"
						fontWeight="bold"
						spacing="5"
						_dark={{ color: 'gray.200' }}
					>
						{buttons.map((btn, idx) => {
							if (btn.action) {
								return (
									<Button
										variant="unstyled"
										mr="0"
										onClick={() => {
											setCallOnClose(true);
											btn.action();
										}}
										padding={0}
										key={idx}
									>
										<Image
											src={getIcon(btn.icon, router.pathname === btn.route)}
											alt={btn.alt}
											marginRight="10px"
										/>
										{btn.alt}
									</Button>
								);
							}
							return (
								<Button
									variant="unstyled"
									onClick={() => setCallOnClose(true)}
									padding={0}
									key={idx}
								>
									<Link href={btn.route ?? ''}>
										<Flex>
											<Image
												src={getIcon(btn.icon, router.pathname === btn.route)}
												alt={btn.alt}
												marginRight="10px"
											/>
											{btn.alt}
										</Flex>
									</Link>
								</Button>
							);
						})}

						<Button variant="unstyled" mr="0" onClick={() => setCallOnClose(true)} padding={0}>
							<Link href="/profile">Perfil</Link>
						</Button>
					</VStack>
				</SideBarDrawer>
			)}

			<AddModal
				isModalOpen={isAddModalOpen}
				setIsModalOpen={setIsAddModalOpen}
				setIsAddGoalModalOpen={setIsAddGoalModalOpen}
				setIsAddMediaModalOpen={setIsAddMediaModalOpen}
			/>
			<AddGoal
				isModalOpen={isAddGoalModalOpen}
				setIsModalOpen={setIsAddGoalModalOpen}
				closeAllModals={closeAllModals}
			/>
			<AddRegister
				isModalOpen={isAddMediaModalOpen}
				setIsModalOpen={setIsAddMediaModalOpen}
				closeAllModals={closeAllModals}
			/>
		</Flex>
	);
}
