import { Box, Stack, Image, useBreakpointValue } from '@chakra-ui/react';
import styles from 'styles/VerticalMovingCovers.module.css';

export default function VerticalMovingCovers() {
	const isWideVersion = useBreakpointValue({
		base: false,
		xl: true,
	});

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
