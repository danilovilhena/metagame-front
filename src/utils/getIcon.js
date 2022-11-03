import { useColorMode } from '@chakra-ui/react';

export function getIcon(name, condition = false) {
	const { colorMode } = useColorMode();
	const isLight = colorMode === 'light';

	return `icons/${name}${condition ? '_active' : isLight ? '' : '_dark'}.svg`;
}
