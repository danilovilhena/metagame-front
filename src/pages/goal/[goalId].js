import { Flex, Image, Progress, Skeleton, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { Media } from 'components/common/Media';
import MediaIcon from 'components/common/MediaIcon';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from 'services/api';
import { fetchGoal, fetchGoalMedias } from 'store/backend';
import checkForCookie from 'utils/checkForCookie';
import { formatDate } from 'utils/functions';
import { getConclusion, getTitle } from 'utils/mediaTypes';

export default function Goal() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [isGoalLoaded, setIsGoalLoaded] = useState(false);
	const [isGoalMediasLoaded, setIsGoalMediasLoaded] = useState(false);
	const goal_id = router.asPath.split('/goal/')[1];
	const goal = useSelector((state) => state.backend.goal);
	const goalMedias = useSelector((state) => state.backend.goalMedias);

	const mediaTypesArr = useSelector((state) => state.backend.mediaTypes);

	const mediaTypes = useSelector((state) => state.backend.mediaTypes);

	const goalType = mediaTypesArr
		.find((el) => el.id === (goal.mediatype || goal.mediatype_id))
		?.type?.toLowerCase();

	const goalTitle = getTitle(goalType, goal);
	var isLate = Math.floor(new Date(goal.limit_date).getTime() - new Date().getTime());
	const finishedGoalDate = formatDate(goal.end_date);
	const goalEndDate = formatDate(goal.limit_date);

	const mediaTypeVerbText = getConclusion(
		mediaTypes.find((mediaType) => mediaType.id === goal.mediatype)?.type
	);

	const formatedMediaTypeVerbText =
		mediaTypeVerbText?.charAt(0).toUpperCase() + mediaTypeVerbText?.slice(1);

	const progress = (goal.current_quantity / goal.objective_quantity) * 100;

	async function handleFavoriteGoal() {
		await api
			.post('/goals/favorites', {
				goal: goal_id,
			})
			.then(() => dispatch(fetchGoal(goal_id)));
	}

	useEffect(() => {
		dispatch(fetchGoal(goal_id));
		dispatch(fetchGoalMedias(goal_id));
	}, [goal_id, dispatch]);
	useEffect(() => {
		if (goal) {
			setIsGoalLoaded(true);
		}
		if (goalMedias) {
			setIsGoalMediasLoaded(true);
		}
	}, [goal, goalMedias]);

	return (
		<Flex
			flexDirection="column"
			flex="1"
			px={['2em', '6em']}
			background="primary"
			maxWidth={['300px', '600px']}
			width="100%"
			mx="auto"
			borderRadius="20px"
			color="white"
			py={['1em', '3em']}
			_dark={{ bg: 'gray.900', color: 'gray.200' }}
			alignItems="stretch"
		>
			<Flex justifyContent="center" align="center">
				<MediaIcon type={goalType} />
				<Text as="strong">{goalTitle}</Text>
			</Flex>
			<Flex align="center" mt="10px" justifyContent="space-between">
				<Flex as="strong">
					Status:
					{isGoalLoaded ? (
						!goal.is_active ? (
							<Text as="span" ml="5px" color="green.300">
								Finalizada
							</Text>
						) : isLate < 0 && goal.is_active ? (
							<Text as="span" color="#FDAD15FF" ml="5px">
								Atrasada
							</Text>
						) : (
							<Text as="span" color="#32fc61" ml="5px">
								Ativa
							</Text>
						)
					) : (
						<Skeleton height="25px" width="80px" borderRadius="10px" ml="5px" />
					)}
				</Flex>
				{isGoalLoaded ? (
					<Button variant="unstyled" m="0" px="0" _hover={{}} onClick={handleFavoriteGoal}>
						<Image
							src={`/icons/like${goal.is_liked ? '_active' : ''}.svg`}
							w="1.75rem"
							role="button"
							alt={goal.is_liked ? 'Descurtir' : 'Curtir'}
						/>
						<Text ml="0.2rem">{goal.likes}</Text>
					</Button>
				) : (
					<Skeleton height="25px" width="50px" borderRadius="10px" ml="5px" />
				)}
			</Flex>
			<Flex align="center" justifyContent="space-between" mt="10px">
				<Text as="strong" width="180px" display="flex">
					Iniciada:{' '}
					{isGoalLoaded ? (
						formatDate(goal.start_date)
					) : (
						<Skeleton height="25px" width="80px" borderRadius="10px" ml="5px" />
					)}
				</Text>
				{isGoalLoaded ? (
					<Text as="strong" width="180px" textAlign="end" display="flex" justifyContent="flex-end">
						{finishedGoalDate ? `Encerrou: ${finishedGoalDate}` : `Encerra: ${goalEndDate}`}
					</Text>
				) : (
					<Skeleton height="25px" width="80px" borderRadius="10px" ml="5px" />
				)}
			</Flex>
			<Flex align="center" justifyContent="space-between" mt="10px">
				{isGoalLoaded ? (
					<Text as="strong" width="180px">
						{formatedMediaTypeVerbText}: {goal.current_quantity}
					</Text>
				) : (
					<Skeleton height="25px" width="80px" borderRadius="10px" />
				)}
				<Text as="strong" width="180px" display="flex" justifyContent="flex-end" textAlign="end">
					Progresso:{' '}
					{isGoalLoaded ? (
						`${progress}%`
					) : (
						<Skeleton height="25px" width="80px" borderRadius="10px" ml="5px" />
					)}
				</Text>
			</Flex>
			<Flex align="center" mt="10px"></Flex>
			<Progress value={progress} />
			<Flex marginTop="20px" flexWrap="wrap" justify="center">
				{isGoalMediasLoaded ? (
					goalMedias.map((media, idx) => <Media media={media} key={idx} />)
				) : (
					<>
						<Skeleton height="180px" width="120px" borderRadius="10px" m="10px" />
						<Skeleton height="180px" width="120px" borderRadius="10px" m="10px" />
						<Skeleton height="180px" width="120px" borderRadius="10px" m="10px" />
						<Skeleton height="180px" width="120px" borderRadius="10px" m="10px" />
					</>
				)}
			</Flex>
		</Flex>
	);
}

export { checkForCookie as getServerSideProps };
