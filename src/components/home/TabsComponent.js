import {
	Box,
	Text,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Image,
	Grid,
	GridItem,
} from '@chakra-ui/react';

export function TabsComponent() {
	return (
		<Box bg="primary" padding="5em" color="white" px="11.5em">
			<Text mb="1em">
				Confira as mídias mais populares entre nossos usuários.
			</Text>

			<Tabs variant="unstyled" color="#8C8A97">
				<TabList>
					<Tab
						_selected={{ color: 'white' }}
						fontSize="3em"
						fontWeight="bold"
						pl="0"
					>
						Filmes
					</Tab>
					<Tab _selected={{ color: 'white' }} fontSize="3em" fontWeight="bold">
						Livros
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Grid
							templateColumns="repeat(auto-fill,minmax(160px, 1fr));"
							gap={18}
						>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
								<GridItem
									display="flex"
									justifyContent="center"
									flexDir="column"
									alignItems="center"
									key={idx}
								>
									<Image
										boxSize="150px"
										src="movie-cover.svg"
										alt="cover"
										mb="0.5em"
									/>
									<Text color="white" fontSize="1em">
										Título do filme
									</Text>
								</GridItem>
							))}
						</Grid>
					</TabPanel>
					<TabPanel>
						<Grid
							templateColumns="repeat(auto-fill,minmax(160px, 1fr));"
							gap={18}
						>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => (
								<GridItem
									display="flex"
									justifyContent="center"
									flexDir="column"
									alignItems="center"
									key={idx}
								>
									<Image
										boxSize="150px"
										src="movie-cover.svg"
										alt="cover"
										mb="0.5em"
									/>
									<Text color="white" fontSize="1em">
										Título do livro
									</Text>
								</GridItem>
							))}
						</Grid>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
