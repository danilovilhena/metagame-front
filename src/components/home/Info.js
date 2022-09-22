import { Flex, Text, Box, Image, VStack } from '@chakra-ui/react';

export function Info() {
	return (
		<Box color="#4E4C59" px="11.5em" pb="4em">
			<Text
				as="h1"
				py="1em"
				fontWeight="bold"
				fontSize="3em"
				textAlign="center"
			>
				Consuma o que você quiser.
			</Text>
			<Flex justify="space-around">
				<VStack maxWidth="550px" spacing="1em">
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
				<Image src="/movie-cover.svg" width="360px" h="360px" alt="Cover" />
			</Flex>
		</Box>
	);
}
