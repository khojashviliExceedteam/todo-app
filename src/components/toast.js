import React, {Component} from 'react';
import {connect} from "react-redux";

class Toast extends Component {
	render() {
		const {toast} = this.props
		if (toast) {
			const {message, header} = toast
			return (
				<div className='toast-container' role="alert" aria-live="assertive" aria-atomic="true">
					<div className="toast-header">
							<strong className="me-auto">{header}</strong>
					</div>
					<div className="toast-body">
						{message}
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

const mapStateToProps = state => ({
	toast: state.toast
});

export default connect(mapStateToProps)(Toast);