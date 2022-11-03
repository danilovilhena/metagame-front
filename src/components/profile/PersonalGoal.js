import {
	Box,
	Flex,
	Text,
	Image,
	useColorMode,
	Stack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { MediaIcon } from 'components/common/MediaIcon';

const Badge = ({ children, isCompleted }) => (
	<Flex
		background={isCompleted ? '#3DC92C' : 'secondary'}
		py="1"
		px="3"
		borderRadius="1rem"
	>
		<Text color="#FFFFFF" fontSize=".875rem">
			{children}
		</Text>
	</Flex>
);

export function PersonalGoal({ goal, ...rest }) {
	const { colorMode } = useColorMode();
	const isLight = colorMode === 'light';
	const getIcon = (name) => `icons/${name}${isLight ? '' : '_dark'}.svg`;
	const isCompleted = goal.completion === 100;

	const options = [
		{ name: 'Copiar link', icon: 'link' },
		{ name: 'Excluir meta', icon: 'trash' },
	];

	return (
		<Box>
			<Flex
				align="center"
				justify="space-between"
				{...rest}
				background="#FFFFFF"
				color="primary"
				minW="50%"
				borderRadius="8px"
				p="3"
				pb="4"
			>
				<Flex align="center">
					<MediaIcon type={goal.type} />
					<Text as="strong">{goal.title}</Text>
				</Flex>
				<Stack direction="row" align="center" minW="max-content" spacing={2}>
					<Text>{goal.duration}</Text>
					<Badge isCompleted={isCompleted}>{goal.completion}%</Badge>
					<Menu matchWidth>
						<MenuButton>
							<Image
								src={getIcon('vertical-dots')}
								w="2rem"
								role="button"
								alt="Mais opções"
							/>
						</MenuButton>
						<MenuList minW="max-content">
							{options.map((option, idx) => (
								<MenuItem
									key={idx}
									mr="0"
									icon={
										<Image
											src={getIcon(option.icon, false)}
											alt={option.name}
										/>
									}
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
				borderRadius={isCompleted ? '0 0 8px 8px' : '0 0 0 8px'}
				background={isCompleted ? '#3DC92C' : 'secondary'}
				w={`${goal.completion}%`}
			/>
		</Box>
	);
}