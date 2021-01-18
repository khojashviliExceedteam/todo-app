import {createSelector} from 'reselect'

const getTodoList = state => state.todo.todoList;
const getTodoListLength = state => state.todo.todoList.length;
const getCurrentPage = state => state.todo.currentPage;

export const todoOnCurrentPage = createSelector(
	getTodoList, getCurrentPage,
	(todoList, currentPage) => todoList.slice(currentPage * 5 - 5, currentPage * 5)
)



export const defineMaxPage = createSelector(
	getTodoListLength,
	todoListLength => {
		const x = todoListLength / 5

		if (x > x.toFixed(0)) {
			return 1 + parseInt(x.toFixed(0))
		} else {
			return parseInt(x.toFixed(0));
		}

	}
)