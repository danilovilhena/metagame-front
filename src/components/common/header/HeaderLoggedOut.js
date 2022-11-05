import {
	Flex,
	Box,
	Link,
	Image,
	VStack,
	Divider,
	useBreakpointValue,
	Stack,
	useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import Button from 'components/common/Button';
import LogInModal from 'components/home/LogInModal';
import SignUpModal from 'components/home/SignUpModal';
import SideBarDrawer from 'components/home/SideBarDrawer';
import getIcon from 'utils/getIcon';

export default function Header() {
	const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode();
	const isWideVersion = useBreakpointValue({ base: false, lg: true });
	const isLight = colorMode === 'light';

	const links = [
		{ name: 'Como funciona?', href: '#info' },
		{ name: 'Livros', href: '#tabs' },
		{ name: 'Filmes', href: '#tabs' },
		{ name: 'Jogos', href: '#tabs' },
	];

	return (
		<Flex
			as="header"
			justify="space-between"
			mx={['1em', '2.5em', '5em']}
			h="5em"
			align="center"
			fontSize="1em"
		>
			<Image src={isLight ? '/logo.svg' : '/logo_dark.svg'} alt="Metagame" />

			{isWideVersion ? (
				<>
					<Stack as="nav" spacing="8" direction="row">
						{links.map((link, idx) => (
							<NextLink href={link.href} key={idx} passHref>
								<Link>{link.name}</Link>
							</NextLink>
						))}
					</Stack>
					<Box>
						<Button variant="unstyled" onClick={() => setIsLogInModalOpen(true)}>
							Entrar
						</Button>
						<LogInModal
							isLogInModalOpen={isLogInModalOpen}
							setIsLogInModalOpen={setIsLogInModalOpen}
							setIsSignUpModalOpen={setIsSignUpModalOpen}
						/>
						<Button variant="styled" onClick={() => setIsSignUpModalOpen(true)}>
							Criar conta
						</Button>
						<SignUpModal
							isSignUpModalOpen={isSignUpModalOpen}
							setIsSignUpModalOpen={setIsSignUpModalOpen}
							setIsLogInModalOpen={setIsLogInModalOpen}
						/>
						<Button variant="unstyled" ml="4" onClick={toggleColorMode}>
							<Image src={getIcon('moon')} alt={`Modo ${isLight ? 'escuro' : 'claro'}`} />
						</Button>
					</Box>
				</>
			) : (
				<SideBarDrawer>
					<VStack
						as="nav"
						fontSize="1.5rem"
						alignItems="start"
						mt="50px"
						fontWeight="bold"
						spacing="5"
						_dark={{ color: 'gray.200' }}
					>
						{links.map((link, idx) => (
							<NextLink href={link.href} key={idx} passHref>
								<Link>{link.name}</Link>
							</NextLink>
						))}
						<Divider borderWidth="2px" />

						<>
							<Button
								variant="unstyled"
								onClick={() => setIsLogInModalOpen(true)}
								fontSize="1.5rem"
								padding={0}
							>
								Entrar
							</Button>
							<LogInModal
								isLogInModalOpen={isLogInModalOpen}
								setIsLogInModalOpen={setIsLogInModalOpen}
								setIsSignUpModalOpen={setIsSignUpModalOpen}
							/>
							<Button
								variant="unstyled"
								onClick={() => setIsSignUpModalOpen(true)}
								fontSize="1.5rem"
								padding={0}
								color="secondary"
							>
								Criar conta
							</Button>
							<SignUpModal
								isSignUpModalOpen={isSignUpModalOpen}
								setIsSignUpModalOpen={setIsSignUpModalOpen}
								setIsLogInModalOpen={setIsLogInModalOpen}
							/>
							<Image
								src={getIcon('moon')}
								alt={`Modo ${isLight ? 'escuro' : 'claro'}`}
								cursor="pointer"
								role="button"
								onClick={toggleColorMode}
							/>
						</>
					</VStack>
				</SideBarDrawer>
			)}
		</Flex>
	);
}
