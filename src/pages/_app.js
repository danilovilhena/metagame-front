import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Layout from 'components/layout';
import 'styles/globals.css';

const colors = {
	primary: '#2B2D42',
	secondary: '#DD6E42',
	tertiary: '#3E4160',
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps, ...appProps }) {
	const getComponent = () => {
		const pages = ['/404', '/auth-error'];
		if (pages.includes(appProps.router.pathname)) return <Component {...pageProps} />;
		else {
			return (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			);
		}
	};

	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>{getComponent()}</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
