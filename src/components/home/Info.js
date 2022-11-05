import {
	Flex,
	Text,
	Box,
	Image,
	VStack,
	useBreakpointValue,
	useColorMode,
} from '@chakra-ui/react';

export default function Info() {
	const isWideVersion = useBreakpointValue({ base: false, md: true });
	const { colorMode } = useColorMode();
	const isLight = colorMode === 'light';

	return (
		<Box
			color="primary"
			px={{ base: '2rem', xl: '11.5em' }}
			py="3rem"
			id="info"
			height="100vh"
			_dark={{ color: 'gray.200' }}
		>
			<Text
				as="h1"
				pb="1em"
				fontWeight="bold"
				fontSize={{ base: '2em', lg: '3em' }}
				textAlign="center"
			>
				Consuma o que você quiser.
			</Text>
			<Flex
				flexDir={!isWideVersion && 'column-reverse'}
				justify={isWideVersion && 'space-around'}
				alignItems="center"
			>
				<VStack maxWidth="550px" spacing="1em" mr={isWideVersion && '2rem'}>
					<Text fontWeight="bold" fontSize="1.5em">
						Não fique só falando sobre os filmes que quer assistir, mas
						assista-os.
					</Text>
					<Text>
						Com o Metagame, você pode planejar filmes, livros ou jogos que quer
						consumir e definir em quanto tempo você deseja completar essa meta.
					</Text>
					<Text>
						A cada mídia que você consumir, registre no site ou aplicativo e
						acompanhe seu progresso na meta.
					</Text>
					<Text>
						Você pode compartilhar metas com amigos, buscar metas populares ou
						criadas por outros usuários e acompanhar o progresso de quem está
						completando a mesma meta que você.
					</Text>
					<Text>
						Ao completar as metas, você ganha pontos de experiência, evoluindo
						seu nível e ganhando conquistas no Metagame. Quanto mais alto seu
						nível, melhor será sua colocação no ranking geral!
					</Text>
				</VStack>
				<Image
					src={`/movie${isLight ? '' : '_dark'}.svg`}
					width="360px"
					h="360px"
					alt="Cover"
				/>
			</Flex>
		</Box>
	);
}
