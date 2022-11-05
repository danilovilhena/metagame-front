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
} from '@chakra-ui/react';
import MediaIcon from 'components/common/MediaIcon';
import getIcon from 'utils/getIcon';
import mediaTypes from 'utils/mediaTypes';

export default function PersonalGoal({ goal, ...rest }) {
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
					<MediaIcon type={goal.type} />
					<Text as="strong">{goal.title}</Text>
				</Flex>
				<Stack direction="row" align="center" minW="max-content" spacing={2}>
					<Text>{goal.duration}</Text>
					{isCompleted && <Image src={getIcon('check')} w="1.5rem" alt="Meta concluída" />}
					<Menu matchWidth>
						<MenuButton>
							<Image src={getIcon('vertical-dots')} w="2rem" role="button" alt="Mais opções" />
						</MenuButton>
						<MenuList minW="max-content">
							{options.map((option, idx) => (
								<MenuItem
									key={idx}
									icon={<Image src={getIcon(option.icon, false)} alt={option.name} />}
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
				background={mediaTypes[goal.type].background}
				w={`${goal.completion}%`}
			/>
		</Box>
	);
}
