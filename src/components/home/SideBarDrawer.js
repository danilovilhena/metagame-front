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
import { useRef } from 'react';
import { IoMdMenu } from 'react-icons/io';

import { Button } from '../common/Button';

export function SideBarDrawer({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<>
			<Button
				variant="unstyled"
				padding={0}
				margin={0}
				ref={btnRef}
				onClick={onOpen}
			>
				<Icon as={IoMdMenu} fontSize={32} />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
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
