import { Box, Flex, Image, useBreakpointValue, keyframes, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import styles from 'styles/VerticalMovingCovers.module.css';

export default function VerticalMovingCovers() {
	const medias = useSelector((state) => state.medias.value);
	const isWideVersion = useBreakpointValue({
		base: false,
		xl: true,
	});

	const easeIn = keyframes`
	from {opacity: 0}
	to {opacity: 1}
  `;
	if (Object.keys(medias).length <= 0) {
		return (
			<Flex>
				{[...Array(isWideVersion ? 4 : 3)].map((_, idx) => (
					<Box maxH="100%" overflow="hidden" my={{ base: '2rem', lg: 0 }} key={idx} marginRight={5}>
						<Skeleton width="100px" height="150px" mb="10px" />
						<Skeleton width="100px" height="150px" mb="10px" />
						<Skeleton width="100px" height="150px" mb="10px" />
						<Skeleton width="100px" height="150px" mb="10px" />
						<Skeleton width="100px" height="150px" mb="10px" />
						<Skeleton width="100px" height="150px" mb="10px" />
					</Box>
				))}
			</Flex>
		);
	}

	return (
		<Flex>
			{[...Array(isWideVersion ? 4 : 3)].map((_, idx) => {
				const currentMedias = Object.values(medias)[idx % 3];
				if (currentMedias) {
					return (
						<Box
							maxH="100%"
							overflow="hidden"
							my={{ base: '2rem', lg: 0 }}
							className={styles['slider-body']}
							key={idx}
						>
							<div className={styles['slider']}>
								<div className={idx % 2 == 0 ? styles['slide-track'] : styles['slide-track-b']}>
									{currentMedias.map((_, innerIdx) => (
										<Image
											loading="eager"
											animation={`${easeIn} 4s`}
											w="100px"
											minH="150px"
											objectFit="cover"
											src={currentMedias[idx > 3 ? innerIdx + 9 : innerIdx].image_on_api}
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
					);
				}
			})}
		</Flex>
	);
}
