import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';

const colors = {
	primary: '#2B2D42',
	secondary: '#DD6E42',
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
