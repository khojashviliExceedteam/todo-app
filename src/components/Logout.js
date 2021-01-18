import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

class LogOut extends Component {
	componentDidMount() {
		this.props.dispatch({type: 'UpdateUser', payload: ''});
		this.props.dispatch({type: 'UpdateTodoList', payload: []});
		window.localStorage.loggedIn = '';
	}

	render() {

		return <Redirect to="/login"/>;
	}
}

const mapStateToProps = state => ({
	username: state.username
});


export default connect(mapStateToProps)(LogOut);
