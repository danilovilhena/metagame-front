import Title from 'components/common/Title';
import HomeComponent from 'components/home/HomeComponent';
import checkForCookie from 'utils/checkForCookie';

export default function Home() {
	return (
		<>
			<Title title="Início" />
			<HomeComponent />
		</>
	);
}

export { checkForCookie as getServerSideProps };
