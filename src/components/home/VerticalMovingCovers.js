import { Box, Stack, Image } from '@chakra-ui/react';
import styles from 'styles/VerticalMovingCovers.module.css';

export default function VerticalMovingCovers() {
	return (
		<Box maxW="456px" maxH="100%" overflow="hidden">
			<Stack direction={['column', 'row']} spacing="1rem">
				{[...Array(4)].map((_, idx) => (
					<Stack
						className={
							idx % 2 === 0 ? styles['row-animate'] : styles['row-animate-i']
						}
						direction={['row', 'column']}
						spacing="1rem"
						key={`cover-col-${idx}`}
					>
						{[...Array(8)].map((_, innerIdx) => (
							<Image
								boxSize="100px"
								src="movie-cover.svg"
								alt="cover"
								mb="0.5em"
								key={`cover-movie-${innerIdx}`}
							/>
						))}
					</Stack>
				))}
			</Stack>
		</Box>
	);
}
