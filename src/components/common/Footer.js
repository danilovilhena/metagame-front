import { Grid, Flex, Text, Image, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

export default function Footer() {
	const { colorMode } = useColorMode();
	const isLight = colorMode === 'light';

	return (
		<Flex
			as="footer"
			justify="space-between"
			direction={{ base: 'column', lg: 'row' }}
			px={{ base: '5%', sm: '10%', xl: '15rem' }}
			align="center"
			fontSize="1em"
			py="2rem"
		>
			<Image src={isLight ? '/logo.svg' : '/logo_dark.svg'} alt="Metagame" />
			<Grid
				as="nav"
				justifyContent="space-evenly"
				spacing="2rem"
				direction="row"
				gap="2em"
				gridTemplateColumns="1fr 1fr"
			>
				<Link href="#">
					<a>Politicas de privacidade</a>
				</Link>
				<Link href="#">
					<a>Termos e condições</a>
				</Link>
			</Grid>
			<Text>© 2022 Metagame</Text>
		</Flex>
	);
}
