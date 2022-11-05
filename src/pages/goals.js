import Title from 'components/common/Title';
import GoalComponent from 'components/goals/GoalComponent';
import checkForCookie from 'utils/checkForCookie';

export default function Goals() {
	return (
		<>
			<Title title="Minhas metas" />
			<GoalComponent />
		</>
	);
}

export { checkForCookie as getServerSideProps };
