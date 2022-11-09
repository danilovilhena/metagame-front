import { Flex, Image } from '@chakra-ui/react';
import { getBackground, getName, getIcon } from 'utils/mediaTypes';

export default function MediaIcon({ type }) {
	return (
		<Flex
			background={getBackground(type)}
			borderRadius="4px"
			width="2.5em"
			height="2.5em"
			alignItems="center"
			justifyContent="center"
			mr="1em"
		>
			<Image src={getIcon(type)} color="primary" fontSize="1.5em" alt={getName(type)} />
		</Flex>
	);
}
