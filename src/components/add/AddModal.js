import { VStack, Image } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';

export default function AddModal({
	isModalOpen,
	setIsModalOpen,
	setIsAddMediaModalOpen,
	setIsAddGoalModalOpen,
}) {
	return (
		<Modal
			variant="unstyled"
			ModalTitle="Adicionar"
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
		>
			<VStack
				textAlign="center"
				alignItems="center"
				spacing="1rem"
				color="white"
				width="100%"
				mb="4"
				mt="-2"
			>
				<Button
					variant="styled"
					width="100%"
					backgroundColor="primary"
					onClick={() => setIsAddMediaModalOpen(true)}
				>
					<Image src={getIcon('media-add')} w="1.5rem" alt="" mr="2" />
					Adicionar registro
				</Button>
				<Button
					variant="styled"
					width="100%"
					onClick={() => setIsAddGoalModalOpen(true)}
				>
					<Image src={getIcon('goal-add')} w="1.5rem" alt="" mr="2" />
					Criar meta de consumo
				</Button>
			</VStack>
		</Modal>
	);
}
