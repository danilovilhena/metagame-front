import moment from 'moment';
import 'moment-precise-range-plugin';

const mediaTypes = {
	movie: {
		icon: '/icons/movie.svg',
		background: '#FF4C4D',
		name: 'filme',
		verb: 'assistir',
		conclusion: 'assistidos',
	},
	game: {
		icon: '/icons/game.svg',
		background: '#4CFFB8',
		name: 'jogo',
		verb: 'jogar',
		conclusion: 'concluídos',
	},
	book: {
		icon: '/icons/book.svg',
		background: '#4CA4FF',
		name: 'livro',
		verb: 'ler',
		conclusion: 'lidos',
	},
};

const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
const dateDifferenceAsText = (start_date, limit_date) => {
	const m1 = moment(start_date, 'YYYY-MM-DD').locale('pt-br');
	const m2 = moment(limit_date, 'YYYY-MM-DD').locale('pt-br');
	const { months, days } = moment.preciseDiff(m1, m2, true);
	let message = '';
	if (months > 0) message += `${months} ${months > 1 ? 'meses' : 'mês'}`;
	if (days > 0) message += `${months ? ' e ' : ''}${days} ${days > 1 ? 'dias' : 'dia'}`;
	return message;
};

export default mediaTypes;

export const getName = (name) => name && mediaTypes[name.toLowerCase()]?.name;
export const getGroup = (name) => name && `${mediaTypes[name.toLowerCase()]?.name}s`;
export const getVerb = (name) => name && mediaTypes[name.toLowerCase()]?.verb;
export const getBackground = (name) => name && mediaTypes[name.toLowerCase()]?.background;
export const getIcon = (name) => name && mediaTypes[name.toLowerCase()]?.icon;
export const getConclusion = (name) => name && mediaTypes[name.toLowerCase()]?.conclusion;
export const getTitle = (name, { objective_quantity, start_date, limit_date }) => {
	let message = `${capitalize(getVerb(name))} ${objective_quantity}`;
	message += ` ${getGroup(name)} em ${dateDifferenceAsText(start_date, limit_date)}`;
	return message;
};
