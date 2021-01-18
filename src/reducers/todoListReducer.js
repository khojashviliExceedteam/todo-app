export default function todoList(state = {todoList:[], currentPage:1}, action) {
	switch (action.type) {
		case 'UpdateTodoList':
			return {todoList: action.payload, currentPage: state.currentPage};
		case 'Increment':
			return {todoList: state.todoList, currentPage: state.currentPage+1}
		case 'Decrement':
			return {todoList: state.todoList,currentPage: state.currentPage-1}
		case 'ChangeValue':
			return {todoList: state.todoList,currentPage: action.payload}
		default:
			return state;
	}
}