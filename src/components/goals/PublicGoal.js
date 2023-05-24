import {
	Avatar,
	Flex,
	Text,
	Image,
	Stack,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';
import Button from 'components/common/Button';
import MediaIcon from 'components/common/MediaIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import getIcon from 'utils/getIcon';
import { getTitle } from 'utils/mediaTypes';

export default function PublicGoal({ goal, handleFavoriteGoal, ...rest }) {
	const router = useRouter();
	const options = [{ name: 'Abrir detalhe', icon: 'share', extention: 'png' }];

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
					<Button
						variant="unstyled"
						m="0"
						px="0"
						_hover={{}}
						onClick={() => handleFavoriteGoal(goal.id)}
					>
						<Image
							src={`/icons/like${goal.is_liked ? '_active' : ''}.svg`}
							w="1.75rem"
							role="button"
							alt={goal.is_liked ? 'Descurtir' : 'Curtir'}
						/>
						<Text ml="0.2rem">{goal.likes}</Text>
					</Button>
					<Menu>
						<MenuButton>
							<Image src={getIcon('vertical-dots')} w="2rem" role="button" alt="Mais opções" />
						</MenuButton>
						<MenuList minW="max-content">
							{options.map((option, idx) => (
								<MenuItem
									key={idx}
									onClick={() =>
										router.push({ pathname: `/goal/[goalId]`, query: { goalId: goal.id } })
									}
									icon={
										<Image src={getIcon(option.icon, false, option.extention)} alt={option.name} />
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
					<Link href={`/profile/${goal.creator?.username}`}>
						<Text as="strong" cursor="pointer">
							@{goal.creator?.username}
						</Text>
					</Link>
				</Text>
				<Avatar
					w="2rem"
					h="2rem"
					src={goal.creator?.image_url}
					referrerPolicy="no-referrer"
					name={goal.creator?.username}
					borderRadius="50%"
					ml="4"
				/>
			</Flex>
		</Flex>
	);
}
