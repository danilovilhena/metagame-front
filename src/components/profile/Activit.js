import { Flex, Image, Text } from '@chakra-ui/react';
import { Button } from 'components/common/Button';

export function Activit() {
	return (
		<Flex
			flexDirection="column"
			mx="4.5em"
			background="card_background"
			px="1em"
			borderRadius="10px"
			mb="1em"
		>
			<Flex justifyContent="space-between" alignItems="center">
				<Flex>
					<Image
						width="45px"
						height="60px"
						borderRadius="10px"
						src="/movie-cover.svg"
						mr="1em"
					/>
					<Text display="flex" color="grey" alignItems="center">
						Filme
						<Text as="strong" mx="0.3em" color="secondary">
							Name
						</Text>
						assistido no dia
						<Text as="strong" mx="0.3em" color="secondary">
							24/08/2022
						</Text>
					</Text>
				</Flex>
				<Flex color="grey">
					<Button variant="unstyled">
						<Image src="icons/edit.svg" />
					</Button>
					<Button variant="unstyled" margin="0">
						<Image src="icons/delete.svg" />
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}
