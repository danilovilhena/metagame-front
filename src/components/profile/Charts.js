import { Box, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryPie } from 'victory';
import mediaTypesUtil from 'utils/mediaTypes';
import { useEffect, useState } from 'react';
import { capitalize, groupBy, formatDate } from 'utils/functions';

const isEmpty = (arr) => arr && arr.length === 0;

export default function Charts() {
	const mediaTypes = useSelector((state) => state.backend.mediaTypes);
	const userMedias = useSelector((state) => state.backend.userMedias);
	const [pieData, setPieData] = useState([]);
	const [barData, setBarData] = useState([]);

	useEffect(() => {
		const pieData = mediaTypes.map((el, idx) => {
			const media = el.type.toLowerCase();

			return {
				x: idx,
				y: userMedias.filter((media) => media.mediatype === el.id).length,
				label: capitalize(mediaTypesUtil[media].name),
			};
		});

		setPieData(pieData);

		const groupedByDate = groupBy(userMedias, 'register_date');
		const dates = Object.keys(groupedByDate);
		const splitByDate = dates.map((el) => {
			const splitByMediaType = groupBy(groupedByDate[el], 'mediatype');
			return Object.keys(splitByMediaType).map((split) => {
				return {
					x: formatDate(el),
					y: splitByMediaType[split].length,
				};
			});
		});

		const barData = [];
		splitByDate.forEach((el) => {
			el.forEach((el2, idx) => {
				if (barData[idx] == undefined) barData[idx] = [];
				barData[idx].push(el2);
			});
		});
		barData.map((el) => el.reverse());

		setBarData(barData);
	}, [mediaTypes, userMedias]);

	const colorScale = ['#FF4C4D', '#4CFFB8', '#4CA4FF'];

	if (!isEmpty(barData) && !isEmpty(pieData)) {
		return (
			<Flex
				w="100%"
				gap="8"
				h="16rem"
				my="1rem"
				alignItems="center"
				justifyContent="space-around"
				color="gray.200"
			>
				<Flex flexDirection="column" gap="4">
					{Object.values(mediaTypesUtil).map((el, idx) => (
						<Flex gap="2" alignItems="center" key={idx}>
							<Box w="6" h="6" bg={colorScale[idx]} aria-hidden="true" borderRadius="50%" />
							<Text fontSize="1rem">{capitalize(el.name)}</Text>
						</Flex>
					))}
				</Flex>
				<Box>
					<VictoryPie data={pieData} colorScale={colorScale} height={300} />
				</Box>
				<Box>
					<VictoryChart height={300}>
						<VictoryGroup colorScale={colorScale} offset={30}>
							{barData.map((el, idx) => (
								<VictoryBar data={el} key={idx} />
							))}
						</VictoryGroup>
					</VictoryChart>
				</Box>
			</Flex>
		);
	}

	return <></>;
}
