import Header from 'components/home/Header';
import Cover from 'components/home/Cover';
import Info from 'components/home/Info';
import TabsComponent from 'components/home/TabsComponent';
import FAQ from 'components/home/FAQ';
import Footer from 'components/home/Footer';

export default function Home() {
	return (
		<>
			<Header />
			<Cover />
			<Info />
			<TabsComponent />
			<FAQ />
			<Footer />
		</>
	);
}
