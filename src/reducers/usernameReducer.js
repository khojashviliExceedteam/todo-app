export default function username(state = '', action) {
	switch (action.type) {
		case 'UpdateUser':
			return action.payload
		default:
			return state;
	}
}