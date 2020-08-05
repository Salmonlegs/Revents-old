import { combineReducers } from 'redux';
import testReducer from '../components/sandbox/testReducer';
import eventReducer from '../components/events/eventReducer';

const rootReducer = combineReducers({
	test: testReducer,
	event: eventReducer,
});

export default rootReducer;
