import {
	Modal as ModalChakra,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from '@chakra-ui/react';

export function Modal({
	children,
	confirmModal = false,
	ModalTitle = '',
	modalSize = 'sm',
	isOpen,
	setIsOpen,
}) {
	return (
		<ModalChakra
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			size={modalSize}
			isCentered
		>
			<ModalOverlay />
			<ModalContent _dark={{ bg: 'gray.800' }}>
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
	);
}
