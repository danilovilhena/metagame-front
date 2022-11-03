import { Flex, Image } from '@chakra-ui/react';

export function MediaIcon({ type }) {
	const mediaTypes = {
		movie: { icon: '/icons/movie.svg', background: '#FF4C4D', name: 'Filme' },
		book: { icon: '/icons/book.svg', background: '#4CA4FF', name: 'Livro' },
		game: { icon: '/icons/game.svg', background: '#4CFFB8', name: 'Jogo' },
	};

	return (
		<Flex
			background={mediaTypes[type].background}
			borderRadius="4px"
			width="2.5em"
			height="2.5em"
			alignItems="center"
			justifyContent="center"
			mr="1em"
		>
			<Image
				src={mediaTypes[type].icon}
				color="primary"
				fontSize="1.5em"
				alt={mediaTypes[type].name}
			/>
		</Flex>
	);
}
