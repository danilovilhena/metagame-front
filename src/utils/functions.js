export const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

export const groupBy = (xs, key) => {
	return xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

export const formatDate = (date) => {
	return new Date(date).toLocaleDateString('pt-BR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
};
