import Header from 'components/home/Header';
import Cover from 'components/home/Cover';
import Info from 'components/home/Info';
import TabsComponent from 'components/home/TabsComponent';
import FAQ from 'components/home/FAQ';
import Footer from 'components/home/Footer';
import randomWords from 'random-words';
import { api } from '../services/api';

export default function Home(props) {
	return (
		<>
			<Header />
			<Cover movies={props.movies} books={props.books} games={props.games} />
			<Info />
			<TabsComponent />
			<FAQ />
			<Footer />
		</>
	);
}

export async function getServerSideProps() {
	const res1 = await api.get(
		'https://api.themoviedb.org/3/discover/movie/?api_key=' +
			process.env.TMDB_KEY +
			'&language=pt-BR&sort_by=popularity.desc&vote_average.gte=7&include_adult=false&include_video=false&page=1'
	);

	const res2 = await api.get(
		'https://api.rawg.io/api/games?key=' +
			process.env.RAWG_KEY +
			'&page_size=40&page=2'
	);

	const res3 = await api.get(
		'https://www.googleapis.com/books/v1/volumes?q=' +
			randomWords() +
			'&maxResults=40&orderBy=relevance&filter=paid-ebooks'
	);

	const movies = res1.data;
	const games = res2.data;
	const books = res3.data;

	return {
		props: {
			movies: movies.results,
			games: games.results,
			books: books.items,
		},
	};
}
