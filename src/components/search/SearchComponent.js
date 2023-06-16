import { Flex, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import SearchUserProfile from 'components/search/SearchUserProfile';

const Title = ({ children }) => (
	<Text as="strong" fontSize="3xl" mb="1.5rem">
		{children}
	</Text>
);

export default function SearchComponent({ searchResult = null }) {
	const session = useSession();
	const user = session.data;

	if (user) {
		return (
			<Flex
				flexDirection="column"
				px={['2em', '6em']}
				background="primary"
				color="white"
				py="3em"
				height="100%"
				minHeight="calc(100vh - 160px)"
				_dark={{ bg: 'gray.900', color: 'gray.200' }}
			>
				<Flex width="100%" justifyContent="space-between" mb="1em">
					<Title>Filtro de usuários e metas</Title>
				</Flex>
				{searchResult && searchResult.length > 0 ? (
					<Flex flexWrap="wrap" gap={4}>
						{searchResult.map((user, idx) => (
							<SearchUserProfile user={user} key={idx} />
						))}
					</Flex>
				) : (
					<Text>Nenhum resultado encontrado.</Text>
				)}
			</Flex>
		);
	}
	return <></>;
}
