import {
	Modal as ModalChakra,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
} from '@chakra-ui/react';

export default function Modal({
	children,
	confirmModal = false,
	ModalTitle = '',
	modalSize = 'sm',
	isOpen,
	setIsOpen,
}) {
	return (
		<ModalChakra isOpen={isOpen} onClose={() => setIsOpen(false)} size={modalSize} isCentered>
			<ModalOverlay />
			<ModalContent _dark={{ bg: 'gray.800' }}>
				<ModalHeader
					display="flex"
					flexDir="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Text flex="1">{ModalTitle}</Text>
					<ModalCloseButton position="initial" />
				</ModalHeader>

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
