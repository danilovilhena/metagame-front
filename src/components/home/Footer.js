import { Flex, Link, Text, Image } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
	const links = [
		{ name: 'Políticas de Privacidade', href: '#' },
		{ name: 'Termos e Condições', href: '#' },
	];

	return (
		<Flex
			as="footer"
			justify="space-between"
			mx="15rem"
			align="center"
			fontSize="1em"
			py="6"
		>
			<Image src="/logo.svg" alt="Metagame" />
			<Flex as="nav" justifyContent="space-evenly" w="500px">
				{links.map((link, idx) => (
					<NextLink href={link.href} key={idx} passHref>
						<Link>{link.name}</Link>
					</NextLink>
				))}
			</Flex>
			<Text>© 2022 Metagame</Text>
		</Flex>
	);
}
