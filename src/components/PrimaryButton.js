export default function PrimaryButton(props) {
	return (
		<button 
			className={`${props.className || ''} text-white bg-secondary transition px-4 py-2.5 font-medium rounded-lg hover:bg-primary`}
			onClick={props.onClick}>
			{props.text || props.children}
		</button>
	);
}