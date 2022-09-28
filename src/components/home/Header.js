import {
	Flex,
	Box,
	Link,
	Image,
	VStack,
	Divider,
	useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useState } from 'react';
import { Button } from '../common/Button';
import { LogInModal } from './LogInModal';
import { SignUpModal } from './SignUpModal';
import { SideBarDrawer } from './SideBarDrawer';

export default function Header() {
	const links = [
		{ name: 'Como funciona?', href: '#' },
		{ name: 'Livros', href: '#' },
		{ name: 'Filmes', href: '#' },
		{ name: 'Jogos', href: '#' },
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
			mx="5em"
			h="5em"
			align="center"
			fontSize="1em"
		>
			<Image src="/logo.svg" alt="Metagame" />

			{isWideVersion ? (
				<>
					<Flex as="nav" justifyContent="space-evenly" w="500px">
						{links.map((link, idx) => (
							<NextLink href={link.href} key={idx} passHref>
								<Link>{link.name}</Link>
							</NextLink>
						))}
					</Flex>
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
						<Button
							variant="styled"
							buttonText="Criar conta"
							onClick={() => setIsSignUpModalOpen(true)}
						>
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
						fontSize={28}
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
						<Button
							variant="unstyled"
							onClick={() => setIsLogInModalOpen(true)}
							fontSize={28}
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
							buttonText="Criar conta"
							onClick={() => setIsSignUpModalOpen(true)}
							fontSize={28}
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
					</VStack>
				</SideBarDrawer>
			)}
		</Flex>
	);
}
