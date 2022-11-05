import { parseCookies } from 'nookies';

export default async function checkForCookie(ctx) {
	const cookies = parseCookies(ctx);
	const token = cookies['metagame-token'];
	if (!token) return { redirect: { destination: '/', permanent: false } };
	return { props: {} };
}
