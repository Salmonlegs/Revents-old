import { combineReducers } from 'redux';
import testReducer from '../features/sandbox/testReducer';
import eventReducer from '../features/events/eventReducer';
import modalReducer from '../common/modals/modalReducer';
import authReducer from '../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import dessertReducer from '../features/sandbox/dessertReducer';
import profileReducer from '../features/profilePage/profileReducer';

const rootReducer = combineReducers({
	test: testReducer,
	event: eventReducer,
	modals: modalReducer,
	auth: authReducer,
	async: asyncReducer,
	dessert: dessertReducer,
	profile: profileReducer,
});

export default rootReducer;
