import { Flex, Image } from '@chakra-ui/react';
import mediaTypes from 'utils/mediaTypes';

export default function MediaIcon({ type }) {
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
