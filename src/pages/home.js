import { HeaderComponent } from 'components/common/HeaderComponent';
import { parseCookies } from 'nookies';

export default function Home() {
	return <HeaderComponent />;
}

export async function getServerSideProps(ctx) {
	const cookies = parseCookies(ctx);
	const token = cookies['metagame-token'];
	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
