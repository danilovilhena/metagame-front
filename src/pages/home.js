import { Button } from '../components/common/Button';
import { signOut } from 'next-auth/react';
export default function Home() {
	return (
		<Button variant="styled" onClick={() => signOut()}>
			Test
		</Button>
	);
}
