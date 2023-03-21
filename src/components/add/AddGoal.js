import {
	VStack,
	Image,
	Menu,
	Text,
	Grid,
	MenuButton,
	MenuList,
	MenuItem,
	useToast,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import { Input } from 'components/common/Input';

import { api } from 'services/api';
import { getGroup, getVerb } from 'utils/mediaTypes';
import getIcon from 'utils/getIcon';
import showToast from 'utils/showToast';
import { fetchGoals } from 'store/backend';

const getLengthInDays = (length, period) => {
	switch (period) {
		case 'dias':
			return parseInt(length);
		case 'semanas':
			return parseInt(length) * 7;
		case 'meses':
			return parseInt(length) * 30;
	}
};

export default function AddGoal({ isModalOpen, setIsModalOpen, closeAllModals }) {
	const mediaTypes = useSelector((state) => state.backend.mediaTypes);
	const goals = useSelector((state) => state.backend.goals);
	const [mediaSelected, setMediaSelected] = useState('Movie');
	const [goalPeriod, setGoalPeriod] = useState('dias');
	const [goalValue, setGoalValue] = useState(0);
	const [goalLength, setGoalLength] = useState(0);
	const session = useSession();
	const dispatch = useDispatch();
	const toast = useToast();

	const resetStates = () => {
		setMediaSelected(mediaTypes[0]?.type);
		setGoalPeriod('dias');
		setGoalValue(0);
		setGoalLength(0);
	};

	const addGoal = async () => {
		if (goalValue > 0 && goalLength > 0) {
			const mediaType = mediaTypes.find((media) => media.type === mediaSelected);
			if (mediaType) {
				api
					.post('/goals', {
						mediatype: mediaType.id,
						creator: session.data.id,
						objective_quantity: parseInt(goalValue),
						limit_days: getLengthInDays(goalLength, goalPeriod),
					})
					.then(() => {
						showToast(toast, 'Meta adicionada com sucesso!', 'success');
						resetStates();
						closeAllModals();
						dispatch(fetchGoals(session.data.id));
					})
					.catch((err) => {
						showToast(
							toast,
							`${err?.response?.data?.error}.` || 'Erro ao adicionar meta!',
							'error'
						);
					});
			}
		} else {
			showToast(
				toast,
				!(goalValue > 0)
					? `Preencha a quantidade de ${getGroup(mediaSelected)}`
					: `Insira um período válido`,
				'error'
			);
		}
	};

	const repeatedGoalsOfSameType = () => {
		const selectedId = mediaTypes?.find((media) => media.type === mediaSelected)?.id;
		const lastTwoGoals = goals.length > 1 && goals.slice(-2);

		return (
			lastTwoGoals?.length === 2 &&
			lastTwoGoals[0].mediatype === selectedId &&
			lastTwoGoals[1].mediatype === selectedId
		);
	};

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
								{getVerb(mediaSelected || mediaTypes[0]?.type)}
								<ChevronDownIcon />
							</Button>
						</MenuButton>
						<MenuList minW="max-content">
							{mediaTypes.map((media, idx) => (
								<MenuItem key={idx} onClick={() => setMediaSelected(media.type)}>
									{getVerb(media.type)}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Input
						type="number"
						aria-label={`Número de ${mediaSelected.toLowerCase() || mediaTypes[0]?.type}s`}
						value={goalValue}
						onChange={(e) => setGoalValue(e.target.value)}
					/>
					<Text display="flex" alignItems="center" justifyContent="center" minWidth="80px">
						{getGroup(mediaSelected || mediaTypes[0]?.type)} em
					</Text>
					<Input
						type="number"
						aria-label={`Número de ${goalPeriod}`}
						value={goalLength}
						onChange={(e) => setGoalLength(e.target.value)}
					/>
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
				{repeatedGoalsOfSameType() && (
					<Alert status="warning" textAlign="left">
						<AlertIcon />
						Experimente criar metas de outros tipos! Essa é sua terceira meta seguida de{' '}
						{getGroup(mediaSelected || mediaTypes[0]?.type)}.
					</Alert>
				)}
				<Text alignSelf="start" fontSize="14px" opacity="0.6">
					Lembre-se de criar metas compatíveis com sua rotina
				</Text>
				<Button variant="styled" width="100%" onClick={addGoal}>
					<Image src={getIcon('goal-add')} w="1.5rem" alt="" mr="2" />
					Criar meta de consumo
				</Button>
			</VStack>
		</Modal>
	);
}
