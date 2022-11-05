import Title from 'components/common/Title';
import checkForCookie from 'utils/checkForCookie';

export default function Home() {
	return <Title title="Início" />;
}

export { checkForCookie as getServerSideProps };
