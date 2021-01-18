export default function toast(state = '', action) {
	switch (action.type) {
		case 'UpdateToast':
			return {
				message: action.payload.message,
				header: action.payload.header
			}
		case 'ClearToast':
			return '';
		default:
			return state;
	}
}