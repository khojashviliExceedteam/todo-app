import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {connect} from "react-redux";

export default function withAuth(ComponentToProtect) {
	class Result extends Component {
		state = {
			loading: true,
			redirect: false,
		}

		componentDidMount() {

			const {dispatch} = this.props


			axios.post('http://localhost:4000/getAll', {token: window.localStorage.loggedIn}).then((result) => {


				dispatch({type: 'UpdateUser', payload: result.data.username})
				dispatch({type: 'UpdateTodoList', payload: result.data.todoList});
				this.setState({loading: false});


			})


				.catch(err => {
					dispatch({type:'UpdateToast', payload: {message:'You must be logged In to access this page', header:'Error'}});
					setTimeout(() => {
						dispatch({type:'ClearToast'});
					}, 3000);
					dispatch({type: 'UpdateTodoList', payload: []});
					dispatch({type: 'UpdateUser', payload: ''});
					setTimeout(() => {
						dispatch({type:'ClearToast'});
					}, 3000);
					this.setState({loading: false, redirect: true});
				});
		}


		render() {
			const {loading, redirect} = this.state;
			if (loading) {
				return null;
			}
			if (redirect) {
				return <Redirect to="/login"/>;
			}
			return <ComponentToProtect/>;
		}
	}

	const mapStateToProps = state => ({
		username: state.username,
		todoList: state.todo.todoList,
	});


	return connect(mapStateToProps)(Result);
}