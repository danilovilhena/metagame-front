import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

const colors = {
	primary: '#2B2D42',
	secondary: '#DD6E42',
	grey: '#4E4C59',
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}

export default MyApp;
