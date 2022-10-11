import {
	FormControl,
	FormLabel,
	Input as ChakraInput,
	FormErrorMessage,
	InputGroup,
	InputRightElement,
	Icon,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { Button } from 'components/common/Button';

export function InputBase(
	{ name, label, error = null, rightIcon, rightIconAction, ...rest },
	ref
) {
	return (
		<FormControl isInvalid={!!error}>
			{!!label && (
				<FormLabel htmlFor={name} id={`label-${name}`}>
					{label}
				</FormLabel>
			)}
			<InputGroup>
				<ChakraInput
					name={name}
					id={name}
					variant="filled"
					ref={ref}
					{...rest}
				/>
				{rightIcon && (
					<InputRightElement>
						<Button
							variant="unstyled"
							_hover={{}}
							onClick={() => rightIconAction()}
						>
							<Icon as={rightIcon} fontSize={22} />
						</Button>
					</InputRightElement>
				)}
			</InputGroup>
			{!!error && (
				<FormErrorMessage marginTop={1}>{error.message}</FormErrorMessage>
			)}
		</FormControl>
	);
}

export const Input = forwardRef(InputBase);
