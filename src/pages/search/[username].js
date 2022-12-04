import { Flex, Spinner } from '@chakra-ui/react';
import Title from 'components/common/Title';
import SearchComponent from 'components/search/SearchComponent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from 'services/api';
import checkForCookie from 'utils/checkForCookie';

export default function Search() {
	const router = useRouter();
	const routerArray = router.asPath.split('/');
	const searchValue = routerArray[routerArray.length - 1];

	const [result, setResult] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const findRelatedUsers = (users) => {
		return users.filter((user) => {
			const options = [
				user.username,
				user.first_name,
				user.last_name,
				user.first_name + ' ' + user.last_name,
			];

			return options.some((option) => option.toLowerCase().includes(searchValue.toLowerCase()));
		});
	};

	useEffect(() => {
		async function searchUsers() {
			await api
				.get(`/users`)
				.then((response) => {
					setResult(findRelatedUsers(response.data));
					console.log(findRelatedUsers(response.data));
				})
				.catch((err) => {
					console.log(err);
				});
			setIsLoading(false);
		}

		searchUsers();
	}, [searchValue]);

	if (isLoading) {
		return (
			<Flex width="100vw" justifyContent="center" alignItems="center">
				<Spinner size="lg" />
			</Flex>
		);
	}

	return (
		<>
			<Title title={`Resultados da pesquisa`} />
			<SearchComponent searchResult={result} />
		</>
	);
}

export { checkForCookie as getServerSideProps };

// TODO: Create index page that just says to type in a user name to search
// TODO: Remove share goal button
// TODO: Responsivity
