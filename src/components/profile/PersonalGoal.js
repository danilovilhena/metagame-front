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
	Tooltip,
} from '@chakra-ui/react';
import Button from 'components/common/Button';
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

export default function PersonalGoal({ goal, handleFavoriteGoal, ...rest }) {
	const mediaTypesArr = useSelector((state) => state.backend.mediaTypes);
	const dispatch = useDispatch();
	const toast = useToast();
	const session = useSession();
	const user = session.data;

	const goalType = mediaTypesArr.find((el) => el.id === goal.mediatype)?.type?.toLowerCase();
	const goalCompletion = (goal.current_quantity / goal.objective_quantity) * 100;

	function calcDate() {
		var diff = Math.floor(new Date(goal.limit_date).getTime() - new Date().getTime());
		var day = 1000 * 60 * 60 * 24;

		var days = Math.floor(diff / day);
		var months = Math.floor(days / 31);
		var years = Math.floor(months / 12);

		if (years >= 1) {
			return 'Mais de 1 ano restante';
		}
		if (months >= 1) {
			return months + ' meses restantes';
		}
		if (days > 1) {
			return days + ' dias restantes';
		}
		if (days === 1) {
			return '1 dia restante';
		}
		return false;
	}

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
		<Box position="relative">
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
					{!goal?.is_done && (
						<>
							{calcDate() ? (
								<>
									<Text>{calcDate()}</Text>
									<Badge background={getBackground(goalType)}>{goalCompletion}%</Badge>
								</>
							) : (
								<>
									<Badge background={getBackground(goalType)}>{goalCompletion}%</Badge>
									<Box position="absolute" top="-6px" right="-14px">
										<Tooltip label="Meta atrasada" placement="top-start">
											<Text fontSize="5rem" color="#FDAD15FF" lineHeight="0">
												•
											</Text>
										</Tooltip>
									</Box>
								</>
							)}
						</>
					)}
					{goal?.is_done && <Image src={getIcon('check')} w="1.5rem" alt="Meta concluída" />}
					<Button variant="unstyled" p="0" _hover={{}} onClick={() => handleFavoriteGoal(goal.id)}>
						<Image
							src={`/icons/like${goal.is_liked ? '_active' : ''}.svg`}
							w="1.75rem"
							role="button"
							alt="Descurtir"
						/>
					</Button>
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
