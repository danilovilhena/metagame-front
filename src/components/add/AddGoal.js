import { VStack, Image, Select, Text, Grid } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import { Input } from 'components/common/Input';

export default function AddGoal({ isModalOpen, setIsModalOpen }) {
	return (
		<Modal
			variant="unstyled"
			ModalTitle="Criar meta"
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
			modalSize="2xl"
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
				<Grid
					width="100%"
					color="primary"
					gridTemplateColumns="1fr 2fr 1fr 1fr 1fr 2fr "
					gap="20px"
					alignItems="center"
				>
					<Text textAlign="center" display="flex" alignItems="center">
						Eu quero
					</Text>
					<Select placeholder="assistir" background="primary" color="white">
						<option value="1" style={{ color: 'primary' }}>
							1
						</option>
						<option value="2" style={{ color: 'primary' }}>
							2
						</option>
						<option value="3" style={{ color: 'primary' }}>
							3
						</option>
						<option value="4" style={{ color: 'primary' }}>
							4
						</option>
					</Select>
					<Input type="number" placeholder="0" />
					<Text display="flex" alignItems="center" justifyContent="center" minWidth="80px">
						filmes em
					</Text>
					<Input type="number" placeholder="0" />
					<Select placeholder="dias" background="primary" color="white">
						<option value="1" style={{ color: 'primary' }}>
							1
						</option>
						<option value="2" style={{ color: 'primary' }}>
							2
						</option>
						<option value="3" style={{ color: 'primary' }}>
							3
						</option>
						<option value="4" style={{ color: 'primary' }}>
							4
						</option>
					</Select>
				</Grid>
				<Button
					variant="styled"
					width="100%"
					onClick={() => {
						setIsModalOpen(false);
					}}
				>
					<Image src={getIcon('goal-add')} w="1.5rem" alt="" mr="2" />
					Criar meta de consumo
				</Button>
			</VStack>
		</Modal>
	);
}
