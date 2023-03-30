import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerCloseButton,
	useDisclosure,
	Icon,
} from '@chakra-ui/react';
import { IoMdMenu } from 'react-icons/io';

import Button from 'components/common/Button';
import { useEffect } from 'react';

export default function SideBarDrawer({ children, callOnClose, setCallOnClose }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (callOnClose) {
			setCallOnClose(false);
			onClose();
		}
	}, [callOnClose, onClose]);

	return (
		<>
			<Button variant="unstyled" padding={0} margin={0} onClick={onOpen}>
				<Icon as={IoMdMenu} fontSize={32} />
			</Button>
			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton fontSize={22} mt="10px" mr="10px" />
					<DrawerHeader />

					<DrawerBody>{children}</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
