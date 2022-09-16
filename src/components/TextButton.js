export default function TextButton(props) {
	return (
		<button className={`${props.className} transition p-4 font-medium hover:text-primary`} onClick={props.onClick}>
			{props.text || props.children}
		</button>
	);
}