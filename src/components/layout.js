import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { fetchMediaTypes } from 'store/backend';
import { fetchMediaContent } from 'store/medias';
import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
	const dispatch = useDispatch();
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		dispatch(fetchMediaTypes());
		dispatch(fetchMediaContent(20));
	}, []);

	useEffect(() => {
		if (session.status === 'unauthenticated') {
			router.push('/');
		}
	}, [session]);

	return (
		<>
			<Header />
			<Flex as="main" minHeight="calc(100vh - 160px)" flexDirection="column">
				{children}
			</Flex>
			<Footer />
		</>
	);
}
