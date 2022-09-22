import { Flex, Box, Link, Button, Image } from '@chakra-ui/react';
import NextLink from 'next/link';

export function Header() {
	const links = [
		{ name: 'Como funciona?', href: '#' },
		{ name: 'Livros', href: '#' },
		{ name: 'Filmes', href: '#' },
		{ name: 'Jogos', href: '#' },
	];

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
			<Flex as="nav" justifyContent="space-evenly" w="500px">
				{links.map((link, idx) => (
					<NextLink href={link.href} key={idx} passHref>
						<Link>{link.name}</Link>
					</NextLink>
				))}
			</Flex>
			<Box>
				<Button fontWeight="bold" background="none" mr="1em" _hover={{}}>
					Entrar
				</Button>
				<Button
					fontWeight="bold"
					color="#FFFFFF"
					bg="secondary"
					_hover={{
						filter: 'brightness(1.1)',
						transition: 'filter 0.5s',
					}}
				>
					Criar conta
				</Button>
			</Box>
		</Flex>
	);
}
