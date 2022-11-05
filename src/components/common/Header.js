import { useSession } from 'next-auth/react';
import HeaderLoggedIn from 'components/common/header/HeaderLoggedIn';
import HeaderLoggedOut from 'components/common/header/HeaderLoggedOut';

export default function Header() {
	const session = useSession();
	const user = session.data;

	return user ? <HeaderLoggedIn user={user} /> : <HeaderLoggedOut />;
}
