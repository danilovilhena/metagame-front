import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { fetchMediaTypes } from 'store/backend';
import { fetchMediaContent } from 'store/medias';

export default function Layout({ children }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchMediaTypes());
		dispatch(fetchMediaContent(20));
	}, []);

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
