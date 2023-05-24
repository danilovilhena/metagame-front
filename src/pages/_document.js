import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../../theme';

export default function Document() {
	return (
		<Html style={{ scrollBehavior: 'smooth' }}>
			<Head>
				<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
			</Head>
			<body>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
