import { Flex, Image, Text } from '@chakra-ui/react';
import { Button } from 'components/common/Button';
import { getIcon } from 'utils/getIcon';

export function Activity() {
	return (
		<Flex
			flexDirection="column"
			mx="4.5em"
			background="card_background"
			px="3"
			py="1.5"
			borderRadius="10px"
			mb="1em"
			color="primary"
			_dark={{ bg: 'gray.700', color: 'gray.200' }}
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
					<Text display="flex" alignItems="center">
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
				<Flex>
					<Button variant="unstyled" px="0">
						<Image src={getIcon('edit')} alt="Editar atividade" />
					</Button>
					<Button variant="unstyled" margin="0" px="0">
						<Image src={getIcon('trash')} alt="Deletar atividade" />
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}
