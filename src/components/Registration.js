import React, {Component, Fragment} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";


class Registration extends Component {

	state = {
		usernameInputValue: '',
		passwordInputValue: '',
		confirmPasswordInputValue: '',
		redirectBoolean: false,
	}

	usernameInputChange = (e) => {
		this.setState({usernameInputValue: e.currentTarget.value})
	}

	passwordInputChange = (e) => {
		this.setState({passwordInputValue: e.currentTarget.value})
	}
	confirmPasswordInputChange = (e) => {
		this.setState({confirmPasswordInputValue: e.currentTarget.value})
	}

	submitClick = (e) => {
		e.preventDefault();
		const {usernameInputValue, passwordInputValue, confirmPasswordInputValue} = this.state
		if (axios.post('http://localhost:4000/checkUsername', {username: usernameInputValue})) {
			if (passwordInputValue === confirmPasswordInputValue) {
				axios.post('http://localhost:4000/createUser', {username: usernameInputValue, password: passwordInputValue})
					.then(() => {
						axios.post('http://localhost:4000/Login', {
							username: usernameInputValue,
							password: passwordInputValue
						}).then(res => {
							window.localStorage.setItem('loggedIn', res.data);
							this.props.dispatch({type: 'UpdateUser', payload: usernameInputValue});
							this.setState({
								redirectBoolean: true,
								usernameInputValue: '',
								passwordInputValue: '',
								confirmPasswordInputValue: ''
							})
						})
					}).catch(() => {
					this.props.dispatch({type: 'UpdateToast', payload: {message: 'Something went wrong!', header: 'Error'}});
					setTimeout(() => {
						this.props.dispatch({type: 'ClearToast'});
					}, 3000);
				})


			} else {
				this.props.dispatch({type: 'UpdateToast', payload: {message: 'Passwords Do not match', header: 'Error'}});
				setTimeout(() => {
					this.props.dispatch({type: 'ClearToast'});
				}, 3000);
			}
		} else {
			this.props.dispatch({type: 'UpdateToast', payload: {message: 'Username is already taken', header: 'Error'}});
			setTimeout(() => {
				this.props.dispatch({type: 'ClearToast'});
			}, 3000);
			this.setState({usernameInputValue: '', passwordInputValue: '', confirmPasswordInputValue: ''});
		}


	}

	render() {
		const {usernameInputValue, passwordInputValue, confirmPasswordInputValue, redirectBoolean} = this.state;
		return (
			<Fragment>
				{redirectBoolean ? (<Redirect to='/'/>) :
					(<form className='registrationForm'>
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
							<div className="form-group">
								<label>
									Confirm Password
								</label>
								<input
									type="password"
									className="form-control"
									placeholder="Confirm Password"
									value={confirmPasswordInputValue}
									onChange={this.confirmPasswordInputChange}
								/>
							</div>
							<button
								disabled={!(usernameInputValue.trim() && passwordInputValue.trim() && confirmPasswordInputValue.trim())}
								type="submit"
								className="btn btn-primary"
								onClick={this.submitClick}
							>Sign Up
							</button>
						</form>
					)}


			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	username: state.username,
});
export default connect(mapStateToProps)(Registration);