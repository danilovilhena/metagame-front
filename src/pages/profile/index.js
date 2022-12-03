import Title from 'components/common/Title';
import ProfileComponent from 'components/profile/ProfileComponent';
import checkForCookie from 'utils/checkForCookie';

export default function Profile() {
	return (
		<>
			<Title title="Meu Perfil" />
			<ProfileComponent />
		</>
	);
}

export { checkForCookie as getServerSideProps };
