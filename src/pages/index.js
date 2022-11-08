import { parseCookies } from 'nookies';
import Cover from 'components/index/Cover';
import Info from 'components/index/Info';
import TabsComponent from 'components/index/TabsComponent';
import FAQ from 'components/index/FAQ';
import Title from 'components/common/Title';

export default function Index() {
	return (
		<>
			<Title title="Metagame" />
			<Cover />
			<Info />
			<TabsComponent />
			<FAQ />
		</>
	);
}

export async function getServerSideProps(ctx) {
	const cookies = parseCookies(ctx);
	const token = cookies['metagame-token'];

	if (token) {
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
