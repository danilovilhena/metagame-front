import { Flex, Text, Highlight } from '@chakra-ui/react';
import VerticalMovingCovers from './VerticalMovingCovers';

export default function Cover() {
	return (
		<Flex
			bg="primary"
			padding="5em"
			justify="space-around"
			align="center"
			color="white"
			maxH="656px"
			overflow="hidden"
		>
			<Flex wrap="wrap" maxW="600px" alignItems="center">
				<Text fontWeight="bold" fontSize="3em">
					<Highlight query="filmes" styles={{ color: 'secondary' }}>
						Uma nova maneira de consumir os filmes que você sempre quis
					</Highlight>
				</Text>
				<Flex mt="2em">
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
			<VerticalMovingCovers />
		</Flex>
	);
}
