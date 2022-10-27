import {
	Text,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Image,
	Grid,
	GridItem,
	Flex,
} from '@chakra-ui/react';

export default function TabsComponent({ content, getCover }) {
	const getCoverTitle = (row, item) => {
		if (item) {
			if (row === 0 && item.title) {
				return item.title;
			} else if (row === 1 && item.name) {
				return item.name;
			} else if (row === 2 && item.volumeInfo && item.volumeInfo.title) {
				return item.volumeInfo.title;
			}
		}
	};

	return (
		<Flex
			flexDir="column"
			justify="center"
			bg="primary"
			color="white"
			px={{ base: '1rem', sm: '3rem', xl: '11.5em' }}
			py="3rem"
			_dark={{ bg: 'gray.900', color: 'gray.200' }}
		>
			<Text>Confira as mídias mais populares entre nossos usuários.</Text>

			<Tabs variant="unstyled" color="#8C8A97">
				<TabList flexDirection={{ base: 'row', sm: 'row' }} flexWrap="wrap">
					{Object.keys(content).map((tabOption, index) => (
						<Tab
							_selected={{ color: 'white' }}
							fontSize={{ base: '2em', lg: '3em' }}
							fontWeight="bold"
							pl="0"
							w="fit-content"
							overflow="hidden"
							key={index}
						>
							{tabOption.charAt(0).toUpperCase() + tabOption.slice(1)}
						</Tab>
					))}
				</TabList>
				<TabPanels>
					{Object.entries(content).map((tabOptionContent, idx) => (
						<TabPanel key={`panel-${idx}`}>
							<Grid
								templateColumns="repeat(auto-fill,minmax(160px, 1fr));"
								gap={18}
							>
								{tabOptionContent[1].slice(0, 12).map((item, innerIdx) => (
									<GridItem
										key={`content-${innerIdx}`}
										display="flex"
										justifyContent="center"
										flexDir="column"
										alignItems="center"
										px={5}
										overflow="hidden"
									>
										<Image
											boxSize="200px"
											objectFit="cover"
											borderRadius="10px"
											shadow="md"
											src={getCover(idx, innerIdx)}
											alt="cover"
											mb="0.5em"
											boxShadow="10px 5px 5px rgba(0,0,0,0.3);"
										/>
										<Text
											color="white"
											fontSize="1em"
											lineHeight="1em"
											maxWidth="150px"
											textAlign="center"
											overflow="hidden"
											className="textElipsis"
										>
											{getCoverTitle(idx, item)}
										</Text>
									</GridItem>
								))}
							</Grid>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Flex>
	);
}
