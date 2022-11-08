import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import Layout from 'components/layout';
import 'styles/globals.css';
import { MediasProvider } from 'contexts/MediasContext';
import store from 'store';

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
				<MediasProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</MediasProvider>
			);
		}
	};

	return (
		<Provider store={store}>
			<SessionProvider session={pageProps.session}>
				<ChakraProvider theme={theme}>{getComponent()}</ChakraProvider>
			</SessionProvider>
		</Provider>
	);
}

export default MyApp;
