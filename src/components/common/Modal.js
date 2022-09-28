import {
	Modal as ModalChakra,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Icon,
} from '@chakra-ui/react';

export function Modal({
	children,
	confirmModal = false,
	variant = 'unstyled',
	icon,
	iconSize = 22,
	buttonText = 'Abrir Modal',
	ModalTitle = '',
	modalSize = 'sm',
	isOpen,
	setIsOpen,
}) {
	function selectVariant() {
		switch (variant) {
			case 'unstyled':
				return (
					<Button
						fontWeight="bold"
						background="none"
						mr="1em"
						onClick={() => setIsOpen(true)}
						_hover={{}}
					>
						{buttonText}
					</Button>
				);
			case 'styled':
				return (
					<Button
						fontWeight="bold"
						color="#FFFFFF"
						bg="secondary"
						onClick={() => setIsOpen(true)}
						_hover={{
							filter: 'brightness(0.9)',
							transition: 'filter 0.5s',
						}}
					>
						{buttonText}
					</Button>
				);
			case 'icon':
				if (!icon) {
					return (
						<Button
							background="none"
							_hover={{}}
							onClick={() => setIsOpen(true)}
						>
							<Icon />
						</Button>
					);
				}
				return (
					<Button background="none" _hover={{}} onClick={() => setIsOpen(true)}>
						<Icon as={icon} fontSize={iconSize} />
					</Button>
				);
		}
	}

	return (
		<>
			{variant && selectVariant()}

			<ModalChakra
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				size={modalSize}
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{ModalTitle}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{children}</ModalBody>

					{confirmModal && (
						<ModalFooter>
							<Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
								Fechar
							</Button>
							<Button variant="ghost">Confirm Action</Button>
						</ModalFooter>
					)}
				</ModalContent>
			</ModalChakra>
		</>
	);
}
