import { Button as ChakraButton } from '@chakra-ui/react';

export default function Button({ variant, children, ...rest }) {
	switch (variant) {
		case 'unstyled':
			return (
				<ChakraButton
					fontWeight="bold"
					background="none"
					mr="1em"
					_hover={{
						backgroundColor: '#f8f8ff',
						transition: 'background-color 0.5s',
						_dark: {
							backgroundColor: 'gray.700',
						},
					}}
					{...rest}
				>
					{children}
				</ChakraButton>
			);
		case 'styled':
			return (
				<ChakraButton
					fontWeight="bold"
					color="#FFFFFF"
					bg="secondary"
					_hover={{
						filter: 'brightness(0.9)',
						transition: 'filter 0.5s',
					}}
					{...rest}
				>
					{children}
				</ChakraButton>
			);
		default:
			return;
	}
}
