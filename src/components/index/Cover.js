import { Flex, Text, Highlight } from '@chakra-ui/react';
import VerticalMovingCovers from './VerticalMovingCovers';

export default function Cover() {
	return (
		<Flex
			bg="primary"
			padding={{ base: '0', xl: '5em' }}
			justify="space-around"
			align="center"
			color="white"
			maxH={{ base: 'none', lg: '656px' }}
			overflow="hidden"
			flexDirection={{ base: 'column', lg: 'row' }}
			_dark={{ bg: 'gray.900' }}
		>
			<Flex
				wrap="wrap"
				maxW="600px"
				alignItems="center"
				mt={{ base: '2rem', lg: 0 }}
				px={{ base: '1rem', md: 0 }}
				_dark={{ color: 'gray.200' }}
			>
				<Text
					fontWeight="bold"
					fontSize={{ base: '2em', sm: '3em' }}
					align={{ base: 'center', lg: 'left' }}
				>
					<Highlight query="filmes" styles={{ color: 'secondary' }}>
						Uma nova maneira de consumir os filmes que você sempre quis
					</Highlight>
				</Text>
				<Flex mt="2em" flexDirection={{ base: 'column', md: 'row' }}>
					<Flex
						flexDirection={{ base: 'row', md: 'column' }}
						mr={{ base: 0, sm: '1em' }}
						mb={{ base: '1em', sm: 0 }}
					>
						<Text
							border="solid 2px white"
							borderRadius="50%"
							w="30px"
							h="30px"
							textAlign="center"
							fontWeight="bold"
							mb="0.5em"
							mr=".5em"
						>
							1
						</Text>
						<Text flex="1">
							Crie listas ou por busque por listas populares de livros, filmes e jogos
						</Text>
					</Flex>
					<Flex
						flexDirection={{ base: 'row', md: 'column' }}
						mr={{ base: 0, sm: '1em' }}
						mb={{ base: '1em', sm: 0 }}
					>
						<Text
							border="solid 2px white"
							borderRadius="50%"
							w="30px"
							h="30px"
							textAlign="center"
							fontWeight="bold"
							mb="0.5em"
							mr=".5em"
						>
							2
						</Text>
						<Text flex="1">Defina em quanto tempo você deseja completar essa lista</Text>
					</Flex>
					<Flex flexDirection={{ base: 'row', md: 'column' }}>
						<Text
							border="solid 2px white"
							borderRadius="50%"
							w="30px"
							h="30px"
							textAlign="center"
							fontWeight="bold"
							mb="0.5em"
							mr=".5em"
						>
							3
						</Text>
						<Text flex="1">
							A cada livro, filme ou jogo consumido, acompanhe seu progresso na lista
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<VerticalMovingCovers />
		</Flex>
	);
}
