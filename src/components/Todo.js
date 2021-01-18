import React, {Fragment, Component} from 'react';
import axios from 'axios';


class Todo extends Component {
	state = {
		editMode: false,
		editInput: this.props.data.todo
	}

	deleteClick = (id) => {
		const {deletFun} = this.props
		axios.post('http://localhost:4000/delete', {_id: id, token: window.localStorage.loggedIn})
			.then(() => {
				deletFun(id);
			})
			.catch(() => {
				this.props.dispatch({type: 'UpdateToast', payload: {message: 'Something Went Wrong', header: 'Error'}});
				setTimeout(() => {
					this.props.dispatch({type: 'ClearToast'});
				}, 3000);
			})

	}

	cancelClickHandler = (todo) => {

		this.setState({editMode: false, editInput: todo});
	}

	saveClickHandler = (id) => {
		const {editInput} = this.state;
		const {editTodo, data} = this.props;
		if (editInput.trim()) {
			axios.post('http://localhost:4000/editTodo', {
				_id: id,
				todo: this.state.editInput,
				token: window.localStorage.loggedIn
			})
				.then(() => {

					editTodo(id, editInput);
					this.setState({editMode: false})
				})
				.catch(() => {
					this.props.dispatch({type: 'UpdateToast', payload: {message: 'Something Went wrong', header: 'Error'}});
					setTimeout(() => {
						this.props.dispatch({type: 'ClearToast'});
					}, 3000);
				})
		} else {
			this.props.dispatch({type: 'UpdateToast', payload: {message: 'Input is Empty!', header: 'Error'}});
			setTimeout(() => {
				this.props.dispatch({type: 'ClearToast'});
			}, 3000);
			this.setState({editInput: data.todo})
		}
	}

	editInputChange = (e) => {
		this.setState({editInput: e.currentTarget.value})
	}

	editClick = () => {
		this.setState({editMode: true});
	}

	render() {
		const {editInput, editMode} = this.state;
		const {data, editCheckboxFun} = this.props;
		return (
			<Fragment>
				{editMode ? (
					<div>
						<input
							type="text"
							className="form-control"
							placeholder="Enter Todo"
							onChange={this.editInputChange}
							value={editInput}/>
						<div className="d-grid gap-2 d-md-flex justify-content-md-end">
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={() => this.saveClickHandler(data._id)}
							>
								Save
							</button>
							<button
								type="button"
								className="btn btn-outline-danger"
								onClick={() => this.cancelClickHandler(data.todo)}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<Fragment>
						<input
							className="form-check-input me-1"
							type="checkbox"
							value=""
							checked={data.checked}
							onChange={() => editCheckboxFun(data._id, !data.checked)}
						/>
						<span>
							{data.todo}
						</span>

						<div className="d-grid gap-2 d-md-flex justify-content-md-end">
							<button
								type="button"
								className="btn btn-outline-primary"
								onClick={() => this.editClick()}
							>
								Edit
							</button>
							<button
								type="button"
								className="btn btn-outline-danger"
								onClick={() => this.deleteClick(data._id)}
							>
								Delete
							</button>
						</div>
					</Fragment>
				)}

			</Fragment>
		)
	}
}

export {Todo}