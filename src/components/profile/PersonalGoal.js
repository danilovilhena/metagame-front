import {
	Box,
	Flex,
	Text,
	Image,
	Stack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useToast,
} from '@chakra-ui/react';
import MediaIcon from 'components/common/MediaIcon';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from 'services/api';
import { fetchGoals } from 'store/backend';
import getIcon from 'utils/getIcon';
import { getBackground, getTitle } from 'utils/mediaTypes';
import showToast from 'utils/showToast';

const Badge = ({ children, background }) => (
	<Flex background={background} py="1" px="3" borderRadius="1rem">
		<Text color="primary" fontSize=".875rem">
			{children}
		</Text>
	</Flex>
);

export default function PersonalGoal({ goal, ...rest }) {
	const mediaTypesArr = useSelector((state) => state.backend.mediaTypes);
	const dispatch = useDispatch();
	const toast = useToast();
	const session = useSession();
	const user = session.data;

	const goalType = mediaTypesArr.find((el) => el.id === goal.mediatype)?.type?.toLowerCase();
	const goalCompletion = (goal.current_quantity / goal.objective_quantity) * 100;

	const deleteGoal = () => {
		api
			.delete(`/goals/${goal.id}`)
			.then(() => {
				showToast(toast, 'Meta excluída com sucesso!', 'success');
				dispatch(fetchGoals(user.id));
			})
			.catch((err) => {
				showToast(toast, `${err?.response?.data?.error}.` || 'Erro ao excluir meta!', 'error');
			});
	};

	const options = [
		// { name: 'Copiar link', icon: 'link', action: () => {} },
		{ name: 'Excluir meta', icon: 'trash', action: deleteGoal },
	];

	return (
		<Box>
			<Flex
				align="center"
				justify="space-between"
				background="#FFFFFF"
				color="primary"
				minW="50%"
				borderRadius="8px"
				p="3"
				pb="4"
				{...rest}
				_dark={{ bg: 'gray.700', color: 'gray.200' }}
			>
				<Flex align="center">
					<MediaIcon type={goalType} />
					<Text as="strong">{getTitle(goalType, goal)}</Text>
				</Flex>
				<Stack direction="row" align="center" minW="max-content" spacing={2}>
					<Text>{goal.duration}</Text>
					{!goal?.is_done && <Badge background={getBackground(goalType)}>{goalCompletion}%</Badge>}
					{goal?.is_done && <Image src={getIcon('check')} w="1.5rem" alt="Meta concluída" />}
					<Menu matchWidth>
						<MenuButton>
							<Image src={getIcon('vertical-dots')} w="2rem" role="button" alt="Mais opções" />
						</MenuButton>
						<MenuList minW="max-content">
							{options.map((option, idx) => (
								<MenuItem
									key={idx}
									icon={<Image src={getIcon(option.icon, false)} alt={option.name} />}
									onClick={option.action}
								>
									{option.name}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
				</Stack>
			</Flex>
			<Box
				height="0.5rem"
				marginTop="-0.5rem"
				borderRadius={goal?.is_done ? '0 0 8px 8px' : '0 0 0 8px'}
				background={getBackground(goalType)}
				w={`${goalCompletion}%`}
			/>
		</Box>
	);
}
