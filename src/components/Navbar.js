import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Navbar extends Component {
	render() {
		const {username} = this.props
		return (
			<Fragment>
				{username ?
					(<Fragment>
						<li className='linkItem'>
							<Link to='/'>Todo App</Link>
						</li>
						<li className='linkItem'>
							<Link to='/Logout'>Log Out</Link>
						</li>
					</Fragment>)
					: (<Fragment>
						<li className='linkItem'>
							<Link to='/Login'>Login</Link>
						</li>
						<li className='linkItem'>
							<Link to='/Registration'>Registration</Link>
						</li>
					</Fragment>)
				}
			</Fragment>

		)
	}
}

const mapStateToProps = state => ({
	username: state.username,
	toast:state.toast
});

export default connect(mapStateToProps)(Navbar);