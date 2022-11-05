import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Layout from 'components/layout';
import 'styles/globals.css';

const colors = {
	primary: '#2B2D42',
	secondary: '#DD6E42',
	elementBackground: '#3E4160',
	grey: '#4E4C59',
	card_background: '#FFFFFF',
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
