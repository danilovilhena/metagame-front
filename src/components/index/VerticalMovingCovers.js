import { Box, Flex, Image, useBreakpointValue, keyframes } from '@chakra-ui/react';
import { useMedias } from 'contexts/MediasContext';
import styles from 'styles/VerticalMovingCovers.module.css';

export default function VerticalMovingCovers() {
	const { getCover } = useMedias();
	const isWideVersion = useBreakpointValue({
		base: false,
		xl: true,
	});

	const easeIn = keyframes`
	from {opacity: 0}
	to {opacity: 1}
  `;
	return (
		<Flex>
			{[...Array(isWideVersion ? 4 : 3)].map((_, idx) => (
				<Box
					maxH="100%"
					overflow="hidden"
					my={{ base: '2rem', lg: 0 }}
					className={styles['slider-body']}
					key={idx}
				>
					<div className={styles['slider']}>
						<div className={idx % 2 == 0 ? styles['slide-track'] : styles['slide-track-b']}>
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
						</div>
					</div>
				</Box>
			))}
		</Flex>
	);
}