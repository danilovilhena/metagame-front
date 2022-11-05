import { Link, Text, Image, Stack, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
	const { colorMode } = useColorMode();
	const isLight = colorMode === 'light';

	const links = [
		{ name: 'Políticas de Privacidade', href: '#' },
		{ name: 'Termos e Condições', href: '#' },
	];

	return (
		<Stack
			as="footer"
			justify="space-between"
			direction={{ base: 'column', lg: 'row' }}
			spacing={{ base: '1rem', lg: '0' }}
			mx={{ base: '5%', sm: '10%', xl: '15rem' }}
			align="center"
			fontSize="1em"
			py="2rem"
		>
			<Image src={isLight ? '/logo.svg' : '/logo_dark.svg'} alt="Metagame" />
			<Stack
				as="nav"
				justifyContent="space-evenly"
				spacing="2rem"
				direction="row"
			>
				{links.map((link, idx) => (
					<NextLink href={link.href} key={idx} passHref>
						<Link textAlign="center">{link.name}</Link>
					</NextLink>
				))}
			</Stack>
			<Text>© 2022 Metagame</Text>
		</Stack>
	);
}
