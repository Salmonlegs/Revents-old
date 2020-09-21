const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';
export const APP_LOADED = 'APP_LOADED';

//ACTION CREATORS- returns a type and a payload

//When asyncActionStart is called, the type: ASYNC_ACTION_START is located in Redux state and then the function is run which is located in the asyncReducer below

export function asyncActionStart() {
	return {
		type: ASYNC_ACTION_START,
	};
}
export function asyncActionFinish() {
	return {
		type: ASYNC_ACTION_FINISH,
	};
}

export function asyncActionError(error) {
	return {
		type: ASYNC_ACTION_ERROR,
		payload: error,
	};
}

const initialState = {
	loading: false,
	error: null,
	initialized: false,
};

//THE ACTION

export default function asyncReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ASYNC_ACTION_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case ASYNC_ACTION_FINISH:
			return {
				...state,
				loading: false,
			};
		case ASYNC_ACTION_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case APP_LOADED:
			return {
				...state,
				initialized: true,
			};
		default:
			return state;
	}
}
