import './App.css';
import React from 'react';
import TodoApp from './components/TodoApp'
import Registration from './components/Registration';
import Login from './components/Login';
import withAuth from './components/CheckToken';
import LogOut from './components/Logout';
import Navbar from './components/Navbar';
import Toast from './components/toast';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";


const App = () => {

	return (
		<React.Fragment>
			<Toast/>
			<Router>
				<ul className='linkUl'>
					<Navbar/>
				</ul>
				<Switch>
					<Route path='/login'>
						<Login/>
					</Route>
					<Route path='/registration'>
						<Registration/>
					</Route>
					<Route path='/logout'>
						<LogOut/>
					</Route>
					<Route path='/' component={withAuth(TodoApp)}/>
				</Switch>
			</Router>
		</React.Fragment>
)
}


export default App;
