import Title from 'components/common/Title';
import { parseCookies } from 'nookies';

export default function Home() {
	return <Title title="Início" />;
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
