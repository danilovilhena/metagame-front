export default function showToast(toast, title, status) {
	toast({ title, status, duration: 5000, isClosable: true });
}
