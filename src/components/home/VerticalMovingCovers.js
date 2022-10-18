import {
	Box,
	Stack,
	Image,
	useBreakpointValue,
	keyframes,
} from '@chakra-ui/react';
import styles from 'styles/VerticalMovingCovers.module.css';

export default function VerticalMovingCovers({ getCover }) {
	const isWideVersion = useBreakpointValue({
		base: false,
		xl: true,
	});

	const easeIn = keyframes`
	from {opacity: 0}
	to {opacity: 1}
  `;

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
								animation={`${easeIn} 6s`}
								w="100px"
								minH="150px"
								objectFit="cover"
								src={getCover(idx, innerIdx)}
								alt="cover"
								mb="0.5em"
								borderRadius="0.5rem"
								key={`cover-movie-${innerIdx}`}
								fallbackSrc="movie-cover.svg"
							/>
						))}
					</Stack>
				))}
			</Stack>
		</Box>
	);
}
