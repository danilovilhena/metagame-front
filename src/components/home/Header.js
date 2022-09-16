export default function Header() {
	const links = [
		{ name: 'Como funciona?', href: '#' },
		{ name: 'Livros', href: '#' },
		{ name: 'Filmes', href: '#' },
		{ name: 'Jogos', href: '#' },
	];

	return (
		<header>
			<img src="/logo.svg" alt="Metagame" />
			<nav>
				{links.map((link, idx) => (
					<a href={link.href} key={idx}>
						{link.name}
					</a>
				))}
			</nav>
			<div>
				<button>Entrar</button>
				<button>Criar conta</button>
			</div>
		</header>
	);
}
