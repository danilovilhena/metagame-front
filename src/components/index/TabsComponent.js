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
	Skeleton,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getName } from 'utils/mediaTypes';
import { capitalize } from 'utils/functions';

export default function TabsComponent() {
	const medias = useSelector((state) => state.medias.value);

	return (
		<Flex
			flexDir="column"
			justify="center"
			bg="primary"
			color="white"
			px={{ base: '1rem', sm: '3rem', xl: '11.5em' }}
			py="3rem"
			id="tabs"
			_dark={{ bg: 'gray.900', color: 'gray.200' }}
		>
			<Text>Confira as mídias mais populares entre nossos usuários.</Text>

			<Tabs variant="unstyled" color="#8C8A97">
				<TabList flexDirection={{ base: 'row', sm: 'row' }} flexWrap="wrap">
					{Object.keys(medias).map((tabOption, index) => (
						<Tab
							_selected={{ color: 'white' }}
							fontSize={{ base: '2em', lg: '3em' }}
							fontWeight="bold"
							pl="0"
							w="fit-medias"
							overflow="hidden"
							key={index}
						>
							{capitalize(getName(tabOption.slice(0, -1)))}s
						</Tab>
					))}
				</TabList>
				<TabPanels>
					{Object.keys(medias).length <= 0 && (
						<>
							<Flex flexDirection="row" gap="60px" padding="16px 20px">
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
							</Flex>
							<Flex flexDirection="row" gap="60px" padding="16px 20px">
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
								<Skeleton width="130px" height="200px" borderRadius="10px" />
							</Flex>
						</>
					)}
					{Object.entries(medias).map((tabOptionContent, idx) => (
						<TabPanel key={`panel-${idx}`}>
							<Grid templateColumns="repeat(auto-fill,minmax(160px, 1fr));" gap={18}>
								{tabOptionContent[1].slice(0, 12).map((item, innerIdx) => (
									<GridItem
										key={`medias-${innerIdx}`}
										display="flex"
										flexDir="column"
										alignItems="center"
										px={5}
										overflow="hidden"
									>
										<Image
											loading="eager"
											boxSize="200px"
											objectFit="cover"
											borderRadius="10px"
											shadow="md"
											src={item.image_on_api}
											alt="cover"
											mb="0.5em"
											boxShadow="lg"
											_dark={{ boxShadow: 'dark-lg' }}
										/>
										<Text
											color="white"
											fontSize="1em"
											lineHeight="1.3em"
											maxWidth="150px"
											textAlign="center"
											overflow="hidden"
											className="textElipsis"
										>
											{item.name_on_api}
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
