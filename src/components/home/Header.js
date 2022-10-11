import {
	Flex,
	Box,
	Link,
	Image,
	VStack,
	Divider,
	useBreakpointValue,
	Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useState } from 'react';
import { Button } from '../common/Button';
import { LogInModal } from './LogInModal';
import { SignUpModal } from './SignUpModal';
import { SideBarDrawer } from './SideBarDrawer';

export default function Header() {
	const links = [
		{ name: 'Como funciona?', href: '#info' },
		{ name: 'Livros', href: '#tabs' },
		{ name: 'Filmes', href: '#tabs' },
		{ name: 'Jogos', href: '#tabs' },
	];

	const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	});

	return (
		<Flex
			as="header"
			justify="space-between"
			mx={['1em', '2.5em', '5em']}
			h="5em"
			align="center"
			fontSize="1em"
		>
			<Image src="/logo.svg" alt="Metagame" />

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
						<Button
							variant="unstyled"
							onClick={() => setIsLogInModalOpen(true)}
						>
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
						</>
					</VStack>
				</SideBarDrawer>
			)}
		</Flex>
	);
}
