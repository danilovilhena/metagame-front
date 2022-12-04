import Title from 'components/common/Title';
import SearchComponent from 'components/search/SearchComponent';
import checkForCookie from 'utils/checkForCookie';

export default function Search() {
	return (
		<>
			<Title title={`Resultados da pesquisa`} />
			<SearchComponent searchResult={null} />
		</>
	);
}

export { checkForCookie as getServerSideProps };
