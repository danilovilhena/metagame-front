import Logo from 'assets/logo.svg';
import styles from 'styles/HomeHeader.module.css';
import PrimaryButton from 'components/PrimaryButton';
import TextButton from 'components/TextButton';

export default function HomeHeader() {
	const links = [
		{ name: 'Como funciona?', href: '#' },
		{ name: 'Livros', href: '#' },
		{ name: 'Filmes', href: '#' },
		{ name: 'Jogos', href: '#' },
	];
	return (
		<header className='container mx-auto py-4 px-4 flex items-center justify-between'>
			<img src={Logo} alt='Metagame' />
			<nav>
				{links.map((link, idx) => (
					<a className={styles['nav-link']} href={link.href} key={idx}>{link.name}</a>
				))}
			</nav>
			<div>
				<TextButton className='mr-4' text='Entrar'/>
				<PrimaryButton text='Criar conta'/>
			</div>
		</header>
	);
}