import Title from 'components/common/Title';
import ProfileComponent from 'components/profile/ProfileComponent';
import { parseCookies } from 'nookies';

export default function Profile() {
	return (
		<>
			<Title title="Perfil" />
			<ProfileComponent />
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
