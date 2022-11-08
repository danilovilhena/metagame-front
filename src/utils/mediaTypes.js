const mediaTypes = {
	movie: { icon: '/icons/movie.svg', background: '#FF4C4D', name: 'filme', verb: 'assistir' },
	book: { icon: '/icons/book.svg', background: '#4CA4FF', name: 'livro', verb: 'ler' },
	game: { icon: '/icons/game.svg', background: '#4CFFB8', name: 'jogo', verb: 'jogar' },
};

export default mediaTypes;

export const getName = (name) => name && mediaTypes[name.toLowerCase()].name;
export const getGroup = (name) => name && `${mediaTypes[name.toLowerCase()].name}s`;
export const getVerb = (name) => name && mediaTypes[name.toLowerCase()].verb;
