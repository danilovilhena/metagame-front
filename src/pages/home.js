import { useSession } from 'next-auth/react';
import { parseCookies } from 'nookies';
import HeaderComponent from 'components/common/HeaderComponent';

export default function Home() {
	const session = useSession();
	console.log(session);
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
