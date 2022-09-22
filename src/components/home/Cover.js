import { Flex, Text, Box, Highlight } from '@chakra-ui/react';

export function Cover() {
	return (
		<Flex bg="primary" padding="5em" justify="space-around" color="white">
			<Flex wrap="wrap" maxW="600px">
				<Text fontWeight="bold" fontSize="3em">
					<Highlight query="filmes" styles={{ color: 'secondary' }}>
						Uma nova maneira de consumir os filmes que você sempre quis
					</Highlight>
				</Text>
				<Flex mt="3em">
					<Flex flexDirection="column" mr="1em">
						<Text
							border="solid 2px white"
							borderRadius="50%"
							w="30px"
							h="30px"
							textAlign="center"
							fontWeight="bold"
							mb="0.5em"
						>
							1
						</Text>
						<Text>
							Crie listas ou por busque por listas populares de livros, filmes e
							jogos
						</Text>
					</Flex>
					<Flex flexDirection="column" mr="1em">
						<Text
							border="solid 2px white"
							borderRadius="50%"
							w="30px"
							h="30px"
							textAlign="center"
							fontWeight="bold"
							mb="0.5em"
						>
							2
						</Text>
						<Text>
							Crie listas ou por busque por listas populares de livros, filmes e
							jogos
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Text
							border="solid 2px white"
							borderRadius="50%"
							w="30px"
							h="30px"
							textAlign="center"
							fontWeight="bold"
							mb="0.5em"
						>
							3
						</Text>
						<Text>
							Crie listas ou por busque por listas populares de livros, filmes e
							jogos
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<Box maxW="456px" h="100%">
				IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE
				IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE
				IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE IMAGES HERE
				IMAGES HERE IMAGES HERE
			</Box>
		</Flex>
	);
}
