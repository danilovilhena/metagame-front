import Head from 'next/head';

export default function Title({ title }) {
	return (
		<Head>
			<title>{title}</title>
			<meta property="og:title" content={title} key="title" />
		</Head>
	);
}
