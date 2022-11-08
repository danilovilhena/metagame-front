import { VStack, Image, Flex, Text } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import getIcon from 'utils/getIcon';
import { Input } from 'components/common/Input';
import { useState } from 'react';

export default function AddRegister({ isModalOpen, setIsModalOpen }) {
	const [searchInput, setSearchInput] = useState('');
	return (
		<Modal
			variant="unstyled"
			ModalTitle="Adicionar registro"
			isOpen={isModalOpen}
			setIsOpen={setIsModalOpen}
			modalSize="2xl"
		>
			<VStack
				textAlign="center"
				alignItems="center"
				spacing="1rem"
				color="primary"
				width="100%"
				mb="4"
				mt="-2"
				_dark={{ color: 'white' }}
			>
				<Input
					placeholder="Buscar por filmes, livros ou jogos"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Flex wrap="wrap" gap="20px" justifyContent="center" overflow="auto" maxH="400px">
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
					<Flex flexDirection="column">
						<Image
							width="120px"
							height="150px"
							objectFit="cover"
							borderRadius="10px"
							alt="cover"
							mb="0.5em"
							boxShadow="5px 2.5px 2.5px rgba(0,0,0,0.3);"
							src="movie-cover.svg"
						/>
						<Text
							fontWeight="500"
							maxW="130px"
							className="textElipsis"
							fontSize="1em"
							lineHeight="1em"
							textAlign="center"
							overflow="hidden"
						>
							Movie Name Movie NAME MOVIE name
						</Text>
					</Flex>
				</Flex>
				<Button
					variant="styled"
					width="100%"
					onClick={() => {
						setIsModalOpen(false);
					}}
				>
					<Image src={getIcon('add_dark')} w="1.5rem" alt="" mr="2" />
					Marcar filme como assistido
				</Button>
			</VStack>
		</Modal>
	);
}
