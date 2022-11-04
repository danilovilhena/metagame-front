import Footer from 'components/common/Footer';
import HeaderComponent from 'components/common/HeaderComponent';
import ProfileComponent from 'components/profile/ProfileComponent';
import { parseCookies } from 'nookies';

export default function Profile() {
	return (
		<>
			<HeaderComponent />
			<ProfileComponent />
			<Footer />
		</>
	);
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
