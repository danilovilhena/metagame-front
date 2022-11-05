import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import Button from 'components/common/Button';

export default function Custom404() {
	const { colorMode } = useColorMode();
	const session = useSession();

	return (
		<Stack
			w={{ base: '90%', xl: '100%' }}
			mx="auto"
			flexDir="column"
			alignItems="center"
			justifyContent={{ base: 'flex-start', sm: 'center' }}
			mt={{ base: '8', sm: 0 }}
			h="100vh"
			spacing="4"
		>
			<Image
				src={colorMode === 'light' ? '/logo.svg' : '/logo_dark.svg'}
				alt="Metagame"
			/>
			<Image
				src="/404.svg"
				w={{ base: '100%', xl: '75%' }}
				maxW="2xl"
				alt="Página não encontrada"
			/>
			<Text
				as="h1"
				fontWeight="medium"
				fontSize={{ base: 'lg', sm: 'xl' }}
				textAlign="center"
			>
				Essa página não foi encontrada ou ainda está em construção 🚧
			</Text>
			<Button variant="styled">
				<Link href={session.data ? '/home' : '/'}>Voltar para o início</Link>
			</Button>
		</Stack>
	);
}
