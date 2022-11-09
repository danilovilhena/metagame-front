import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { fetchMediaTypes } from 'store/backend';

export default function Layout({ children }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchMediaTypes());
	}, []);

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
