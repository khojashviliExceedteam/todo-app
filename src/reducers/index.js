import {combineReducers} from 'redux'
import todo from "./todoListReducer";
import username from "./usernameReducer";
import toast from './toastReducer';

export default combineReducers({
	todo,
	username,
	toast
})