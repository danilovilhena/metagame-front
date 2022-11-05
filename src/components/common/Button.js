import { Button as ChakraButton } from '@chakra-ui/react';

export default function Button({ variant, children, ...rest }) {
	switch (variant) {
		case 'unstyled':
			return (
				<ChakraButton
					fontWeight="medium"
					background="none"
					mr="1em"
					transition="background-color 0.5s"
					_hover={{
						backgroundColor: 'gray.100',
						_dark: { backgroundColor: 'gray.700' },
					}}
					_active={{
						backgroundColor: 'gray.200',
						_dark: { backgroundColor: 'gray.600' },
					}}
					{...rest}
				>
					{children}
				</ChakraButton>
			);
		case 'styled':
			return (
				<ChakraButton
					fontWeight="medium"
					color="#FFFFFF"
					bg="secondary"
					transition="filter 0.5s"
					_hover={{ filter: 'brightness(0.9)' }}
					_active={{ filter: 'brightness(0.8)' }}
					{...rest}
				>
					{children}
				</ChakraButton>
			);
		default:
			return;
	}
}
