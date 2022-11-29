import { Flex, Text, Image, Stack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Button from 'components/common/Button';
import MediaIcon from 'components/common/MediaIcon';
import { useSelector } from 'react-redux';
import getIcon from 'utils/getIcon';
import { getTitle } from 'utils/mediaTypes';

// TODO: Update this component's styles to match the design
export default function PublicGoal({ goal, handleFavoriteGoal, ...rest }) {
	const options = [{ name: 'Copiar link', icon: 'link' }];

	const mediaTypesArr = useSelector((state) => state.backend.mediaTypes);
	const goalType = mediaTypesArr
		.find((el) => el.id === (goal.mediatype || goal.mediatype_id))
		?.type?.toLowerCase();

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
					<MediaIcon type={goalType} />
					<Text as="strong">{getTitle(goalType, goal)}</Text>
				</Flex>
				<Stack direction="row" align="center" minW="max-content" spacing={2}>
					<Button variant="unstyled" m="0" _hover={{}} onClick={() => handleFavoriteGoal(goal.id)}>
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
					Criado por <Text as="strong">@{goal.creator?.username}</Text>
				</Text>
				<Image
					src={goal.creator?.image_url}
					w="2rem"
					alt={goal.creator?.username}
					ml="4"
					borderRadius="50%"
				/>
			</Flex>
		</Flex>
	);
}
