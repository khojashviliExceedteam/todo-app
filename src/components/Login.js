import React, {Component, Fragment} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


class Login extends Component {
	state = {
		usernameInputValue: '',
		passwordInputValue: '',
		redirectBoolean: false,
	}


	usernameInputChange = (e) => {
		this.setState({usernameInputValue: e.currentTarget.value})
	}

	passwordInputChange = (e) => {
		this.setState({passwordInputValue: e.currentTarget.value})
	}

	loginClick = (e) => {
		e.preventDefault();
		const {usernameInputValue, passwordInputValue} = this.state
		let checkResult;
		axios.post('http://localhost:4000/login', {
			username: usernameInputValue,
			password: passwordInputValue
		}).then(res => {
			window.localStorage.setItem('loggedIn', res.data);
			window.localStorage.setItem('currentPage', 1);
			checkResult = res.data
			if (checkResult) {
				this.props.dispatch({type: 'UpdateUser', payload: usernameInputValue});
				this.setState({redirectBoolean: true, usernameInputValue: '', passwordInputValue: ''})
			} else {
				this.props.dispatch({
					type: 'UpdateToast',
					payload: {message: 'Username or password is incorrect!', header: 'Error'}
				});
				setTimeout(() => {
					this.props.dispatch({type: 'ClearToast'});
				}, 3000);
				this.setState({usernameInputValue: '', passwordInputValue: ''});
			}


		})
			.catch((error) => {
				this.props.dispatch({
					type: 'UpdateToast',
					payload: {message: 'Username or password is incorrect!', header: 'Error'}
				});
				setTimeout(() => {
					this.props.dispatch({type: 'ClearToast'});
				}, 3000);
			});
	}


	render() {
		const {passwordInputValue, usernameInputValue, redirectBoolean} = this.state

		return (
			<Fragment>
				{redirectBoolean ? (<Redirect to='/'/>) : (
					<form className='registrationForm'>
						<div className="form-group">
							<label>
								Username
							</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter Username"
								value={usernameInputValue}
								onChange={this.usernameInputChange}
							/>
						</div>
						<div className="form-group">
							<label>
								Password
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								value={passwordInputValue}
								onChange={this.passwordInputChange}
							/>
						</div>
						<button
							type="submit"
							disabled={!(usernameInputValue.trim() && passwordInputValue.trim())}
							className="btn btn-primary"
							onClick={this.loginClick}
						>Submit
						</button>
					</form>
				)}
			</Fragment>
		)
	}


}

const mapStateToProps = state => ({
	username: state.username
});

export default connect(mapStateToProps)(Login);