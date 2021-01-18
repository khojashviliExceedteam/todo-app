import axios from 'axios';
import React, {Component, Fragment} from 'react';
import {Todo} from './Todo'
import Pagination from './Pagination'
import {connect} from "react-redux";
import {defineMaxPage, todoOnCurrentPage} from '../selectors/todoSelector'


class TodoApp extends Component {
	state = {
		inputValue: '',
	}

	deleteFunction = (id) => {
		const {todoList, maxPage, currentPage} = this.props;
		let filteredTodoList = todoList.filter((item) => item._id !== id)
		if (filteredTodoList.length % 5 === 0) {
			if (currentPage === maxPage) {
				this.props.dispatch({type: 'UpdateTodoList', payload: filteredTodoList});
				this.props.dispatch({type: 'Decrement'});
			} else {
				this.props.dispatch({type: 'UpdateTodoList', payload: filteredTodoList});
			}

		} else {
			this.props.dispatch({type: 'UpdateTodoList', payload: filteredTodoList});
		}
	}

	handleInputChange = (e) => {
		this.setState({inputValue: e.currentTarget.value});
	}
	editCheckbox = (id, checked) => {
		axios.post('http://localhost:4000/editChecked', {
			_id: id,
			checked: checked,
			token: window.localStorage.loggedIn
		})
			.then(() => {
				let {todoList} = this.props
				todoList = todoList.map((item) => {
					if (item._id === id) {
						return (
							{
								_id: id,
								todo: item.todo,
								checked: checked
							}
						);
					} else {
						return (item);
					}
				})
				this.props.dispatch({type: 'UpdateTodoList', payload: todoList});

			})
			.catch((Error) => {
				this.props.dispatch({type: 'UpdateToast', payload: {message: 'Something went wrong!', header: 'Error'}});
				setTimeout(() => {
					this.props.dispatch({type: 'ClearToast'});
				}, 3000);
			})

	}

	handleBtnClick = () => {
		const {inputValue} = this.state;
		const {maxPage, username} = this.props;
		if (inputValue.trim()) {
			axios.post('http://localhost:4000/create', {
				todo: inputValue,
				username: username,
				token: window.localStorage.loggedIn
			})
				.then((response) => {
					if (response.data.length % 5 === 1) {
						this.props.dispatch({type: 'UpdateTodoList', payload: response.data});
						this.props.dispatch({type: 'ChangeValue', payload: maxPage + 1});
						this.setState({inputValue: ''});
					} else {
						this.props.dispatch({type: 'UpdateTodoList', payload: response.data});
						this.props.dispatch({type: 'ChangeValue', payload: maxPage});
						this.setState({inputValue: ''});
					}

				})
				.catch(() => {
						this.props.dispatch({type: 'UpdateToast', payload: {message: 'Something went wrong!', header: 'Error'}});
						setTimeout(() => {
							this.props.dispatch({type: 'ClearToast'});
						}, 3000)
					}
				);
		} else {
			this.props.dispatch({type: 'UpdateToast', payload: {message: 'Input is empty!', header: 'Error'}});
			setTimeout(() => {
				this.props.dispatch({type: 'ClearToast'});
			}, 3000);
		}
	}
	editTodo = (id, todo) => {

		let {todoList} = this.props
		todoList = todoList.map((item) => {
			if (item._id === id) {
				return (
					{
						_id: id,
						todo: todo,
						checked: item.checked
					}
				);
			} else {
				return item;
			}
		});
		this.props.dispatch({type: 'UpdateTodoList', payload: todoList});
	}

	keyUpHandle = (e) => {
		if (e.keyCode === 13) {
			this.handleBtnClick();
		}
	}

	changePage = (page) => {
		const {maxPage} = this.props
		if (page >= 1 && page <= maxPage) {
			this.props.dispatch({type: 'ChangeValue', payload: page});
		} else {
			this.props.dispatch({type: 'UpdateToast', payload: {message: 'You can\'t change page!', header: 'Error'}});
			setTimeout(() => {
				this.props.dispatch({type: 'ClearToast'});
			}, 3000);
		}
	}

	render() {

		const {inputValue} = this.state
		const {todoOnThisPage} = this.props;

		return (
			<Fragment>
				<div id="inputWraper" className="inputWraper">
					<div>
						<h1>Your Todo List</h1>
						<div className="input-group mb-3">
							<input
								onKeyUp={this.keyUpHandle}
								type="text"
								className="form-control"
								placeholder="Enter Todo"
								onChange={this.handleInputChange}
								value={inputValue}/>
							<button
								onClick={this.handleBtnClick}
								className="btn btn-outline-primary"
								type="button"
								id="button-addon2"
							>
								Add Todo
							</button>
						</div>
					</div>
				</div>
				<div id="outputWraper" className="outputWraper">
					<ul className="list-group">
						{todoOnThisPage.map(item => {
							return (
								<li key={item._id} className="list-group-item text-break">
									<Todo
										key={item._id}
										data={item}
										deletFun={this.deleteFunction}
										editCheckboxFun={this.editCheckbox}
										editTodo={this.editTodo}
									/>
								</li>
							)
						})
						}
					</ul>
					<Pagination
						changePage={this.changePage}
					/>
				</div>

			</Fragment>

		)
	}
}

const mapStateToProps = state => ({
	username: state.username,
	todoList: state.todo.todoList,
	currentPage: state.todo.currentPage,
	maxPage: defineMaxPage(state),
	todoOnThisPage: todoOnCurrentPage(state),
});

export default connect(mapStateToProps)(TodoApp);