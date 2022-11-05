import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import Button from 'components/common/Button';
import Title from 'components/common/Title';

export default function AuthError() {
	const { colorMode } = useColorMode();
	const session = useSession();

	return (
		<>
			<Title title="Erro na autenticação" />
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
					src={colorMode === 'light' ? '/error.svg' : '/error_dark.svg'}
					w={{ base: '100%', xl: '75%' }}
					maxW="2xl"
					alt="Erro na autenticação"
				/>
				<Text
					as="h1"
					fontWeight="medium"
					fontSize={{ base: 'lg', sm: 'xl' }}
					textAlign="center"
				>
					Ocorreu um erro na sua autenticação, tente novamente.
				</Text>
				<Link href={session.data ? '/home' : '/'}>
					<Button variant="styled">Voltar para o início</Button>
				</Link>
			</Stack>
		</>
	);
}
