import {
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

// TODO: Update this component's styles to match the design
export default function PublicGoal({ goal, ...rest }) {
	const options = [
		{ name: 'Copiar link', icon: 'link' },
		{ name: 'Excluir meta', icon: 'trash' },
	];

	return (
		<Flex
			flexDir="column"
			background="#FFFFFF"
			color="primary"
			minW="50%"
			borderRadius="8px"
			p="3"
			{...rest}
			_dark={{ bg: 'gray.700', color: 'gray.200' }}
		>
			<Flex align="center" justify="space-between" w="100%">
				<Flex align="center">
					<MediaIcon type={goal.type} />
					<Text as="strong">{goal.title}</Text>
				</Flex>
				<Stack direction="row" align="center" minW="max-content" spacing={2}>
					<Image
						src={getIcon('like', goal.liked)}
						w="1.75rem"
						role="button"
						alt="Descurtir"
					/>
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
			<Flex mt="4" alignSelf="flex-end" alignItems="center">
				<Text>
					Criado por{' '}
					<Text as="strong">{goal.author && goal.author.username}</Text>
				</Text>
				<Image
					src={goal.author && goal.author.photo}
					w="2rem"
					alt={goal.author && goal.author.username}
					ml="4"
					borderRadius="50%"
				/>
			</Flex>
		</Flex>
	);
}
