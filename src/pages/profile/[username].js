import { Flex, Spinner } from '@chakra-ui/react';
import Title from 'components/common/Title';
import ProfileComponent from 'components/profile/ProfileComponent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from 'services/api';
import checkForCookie from 'utils/checkForCookie';

export default function Profile() {
	const router = useRouter();
	const routerArray = router.asPath.split('/');
	const usernameToSearch = routerArray[routerArray.length - 1];

	const [userProfile, setUserProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function findUserByUsername() {
			await api
				.get(`/users/find/${usernameToSearch}`)
				.then((response) => {
					setUserProfile(response.data);
				})
				.catch((err) => {
					console.error(err.response.data);
				});
			setIsLoading(false);
		}

		findUserByUsername();
	}, []);

	const getTitle = () =>
		userProfile ? userProfile.first_name + ' ' + userProfile.last_name : usernameToSearch;

	if (isLoading) {
		return (
			<Flex width="100vw" justifyContent="center" alignItems="center">
				<Spinner size="lg" />
			</Flex>
		);
	}

	if (!isLoading && !userProfile) {
		router.push('/404');
	}

	return (
		<>
			<Title title={`Perfil de ${getTitle()}`} />
			<ProfileComponent userProfile={userProfile} />
		</>
	);
}

export { checkForCookie as getServerSideProps };
