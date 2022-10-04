import Header from 'components/home/Header';
import Cover from 'components/home/Cover';
import Info from 'components/home/Info';
import TabsComponent from 'components/home/TabsComponent';
import FAQ from 'components/home/FAQ';
import Footer from 'components/home/Footer';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

export default function Index(props) {
	return (
		<>
			<Header />
			<Cover movies={props.movies} books={props.books} games={props.games} />
			<Info />
			<TabsComponent />
			<FAQ />
			<Footer />
		</>
	);
}

export async function getServerSideProps({ req, res }) {
	const session = await unstable_getServerSession(req, res, authOptions);

	if (session) {
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
