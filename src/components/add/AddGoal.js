import { VStack, Image, Menu, Text, Grid, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import { Input } from 'components/common/Input';
import { useEffect, useState } from 'react';
import { api } from 'services/api';
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function AddGoal({ isModalOpen, setIsModalOpen }) {
	const [mediaTypes, setMediaTypes] = useState([]);
	const [mediaSelected, setMediaSelected] = useState('');
	const [goalPeriod, setGoalPeriod] = useState('dias');

	const mediaVerb = (name) => {
		return {
			book: 'ler',
			movie: 'assistir',
			game: 'jogar',
		}[name.toLowerCase()];
	};

	useEffect(() => {
		async function getMediaTypes() {
			const response = await api.get('/mediatypes');
			setMediaTypes(response.data);
			setMediaSelected(response.data[0].type);
		}

		getMediaTypes();
	}, []);

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
				color="primary"
				width="100%"
				mb="4"
				mt="-2"
				_dark={{ color: 'white' }}
			>
				<Grid
					width="100%"
					gridTemplateColumns="1fr 2fr 1fr 1fr 1fr 2fr "
					gap="1rem"
					alignItems="center"
				>
					<Text textAlign="center" display="flex" alignItems="center">
						Eu quero
					</Text>
					<Menu matchWidth>
						<MenuButton>
							<Button
								variant="styled"
								background="primary"
								width="100%"
								display="flex"
								justifyContent="space-between"
							>
								{mediaVerb(mediaSelected)}
								<ChevronDownIcon />
							</Button>
						</MenuButton>
						<MenuList minW="max-content">
							{mediaTypes.map((media, idx) => (
								<MenuItem key={idx} onClick={() => setMediaSelected(media.type)}>
									{mediaVerb(media.type)}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Input type="number" placeholder="0" />
					<Text display="flex" alignItems="center" justifyContent="center" minWidth="80px">
						{mediaSelected.toLowerCase()}s em
					</Text>
					<Input type="number" placeholder="0" />
					<Menu matchWidth>
						<MenuButton>
							<Button
								variant="styled"
								background="primary"
								width="100%"
								display="flex"
								justifyContent="space-between"
							>
								{goalPeriod}
								<ChevronDownIcon />
							</Button>
						</MenuButton>
						<MenuList minW="max-content">
							<MenuItem onClick={() => setGoalPeriod('dias')}>dias</MenuItem>
							<MenuItem onClick={() => setGoalPeriod('semanas')}>semanas</MenuItem>
							<MenuItem onClick={() => setGoalPeriod('meses')}>meses</MenuItem>
						</MenuList>
					</Menu>
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
