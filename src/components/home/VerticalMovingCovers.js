import { Box, Stack, Image, useBreakpointValue } from '@chakra-ui/react';
import styles from 'styles/VerticalMovingCovers.module.css';

export default function VerticalMovingCovers(props) {
	const isWideVersion = useBreakpointValue({
		base: false,
		xl: true,
	});

	const getCover = (row, index) => {
		switch (row) {
			case 0:
				return `https://image.tmdb.org/t/p/w500/${props.data.movies[index].poster_path}`;
			case 1:
				return props.data.games[index].background_image;
			case 2:
				return props.data.books[index].volumeInfo.imageLinks.smallThumbnail;
			case 3:
				return `https://image.tmdb.org/t/p/w500/${
					props.data.movies[index + 9].poster_path
				}`;
			default:
				return 'movie-cover.svg';
		}
	};

	return (
		<Box
			maxW={{ base: '100%', lg: '456px' }}
			maxH="100%"
			overflow="hidden"
			my={{ base: '2rem', lg: 0 }}
		>
			<Stack direction={{ base: 'column', lg: 'row' }} spacing="1rem">
				{[...Array(isWideVersion ? 4 : 3)].map((_, idx) => (
					<Stack
						className={
							idx % 2 === 0 ? styles['row-animate'] : styles['row-animate-i']
						}
						direction={{ base: 'row', lg: 'column' }}
						spacing="1rem"
						key={`cover-col-${idx}`}
					>
						{[...Array(10)].map((_, innerIdx) => (
							<Image
								w="100px"
								minH="150px"
								objectFit="cover"
								src={getCover(idx, innerIdx)}
								alt="cover"
								mb="0.5em"
								borderRadius="0.5rem"
								key={`cover-movie-${innerIdx}`}
								onError={() => {
									this.onerror = null;
									this.src = 'movie-cover.svg';
								}}
							/>
						))}
					</Stack>
				))}
			</Stack>
		</Box>
	);
}
