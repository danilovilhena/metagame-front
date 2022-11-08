import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import Cover from 'components/index/Cover';
import Info from 'components/index/Info';
import TabsComponent from 'components/index/TabsComponent';
import FAQ from 'components/index/FAQ';
import Title from 'components/common/Title';
import { getMediaContent } from 'utils/getMediaContent';

export default function Index() {
	const [data, setData] = useState({});

	const getCover = (row, index) => {
		if (row === 0 && data.movies && data.movies[index]) {
			return `https://image.tmdb.org/t/p/w500${data.movies[index].poster_path}`;
		} else if (row == 1 && data.games && data.games[index]) {
			return data.games[index].background_image;
		} else if (row == 2 && data.books && data.books[index]) {
			return data.books[index].volumeInfo.imageLinks.thumbnail;
		} else if (row == 3 && data.movies && data.movies[index + 9]) {
			return `https://image.tmdb.org/t/p/w500${data.movies[index + 9].poster_path}`;
		}
	};

	useEffect(() => {
		async function fetchMediaContent() {
			const content = await getMediaContent(20);
			setData(content);
		}
		fetchMediaContent();
	}, []);

	useEffect(() => console.log(data), [data]);

	return (
		<>
			<Title title="Metagame" />
			<Cover content={data} getCover={getCover} />
			<Info />
			<TabsComponent content={data} getCover={getCover} />
			<FAQ />
		</>
	);
}

export async function getServerSideProps(ctx) {
	const cookies = parseCookies(ctx);
	const token = cookies['metagame-token'];

	if (token) {
		return {
			redirect: {
				destination: '/home',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
