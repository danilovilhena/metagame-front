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

export default function TabsComponent() {
	return (
		<Flex
			flexDir="column"
			justify="center"
			bg="primary"
			color="white"
			px={{ base: '1rem', sm: '3rem', xl: '11.5em' }}
			py="3rem"
			id="tabs"
			height="100vh"
		>
			<Text>Confira as mídias mais populares entre nossos usuários.</Text>

			<Tabs variant="unstyled" color="#8C8A97">
				<TabList flexDirection={{ base: 'row', sm: 'row' }} flexWrap="wrap">
					<Tab
						_selected={{ color: 'white' }}
						fontSize={{ base: '2em', lg: '3em' }}
						fontWeight="bold"
						pl="0"
						w="fit-content"
					>
						Filmes
					</Tab>
					<Tab
						_selected={{ color: 'white' }}
						fontSize={{ base: '2em', lg: '3em' }}
						fontWeight="bold"
						w="fit-content"
						pl="0"
					>
						Livros
					</Tab>
					<Tab
						_selected={{ color: 'white' }}
						fontSize={{ base: '2em', lg: '3em' }}
						fontWeight="bold"
						w="fit-content"
						pl="0"
					>
						Jogos
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
										Título do jogo
									</Text>
								</GridItem>
							))}
						</Grid>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
}
