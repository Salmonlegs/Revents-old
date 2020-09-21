const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

const initialState = {
	data: 42,
};

export function incrementAction() {
	return { type: INCREMENT_COUNTER };
}

export function decrementAction() {
	return { type: DECREMENT_COUNTER };
}

export default function testReducer(state = initialState, { type }) {
	switch (type) {
		case INCREMENT_COUNTER:
			return {
				...state,
				data: state.data + 1,
			};
		case DECREMENT_COUNTER:
			return {
				...state,
				data: state.data - 1,
			};
		default:
			return state;
	}
}

// export function increment(amount) {
// 	return async function (dispatch) {
// 		dispatch(asyncActionStart());
// 		try {
// 			await delay(1000);
// 			dispatch({ type: INCREMENT_COUNTER, payload: amount });
// 			dispatch(asyncActionFinish());
// 		} catch (error) {
// 			dispatch(asyncActionError(error));
// 		}
// 	};
// }

// export function decrement(amount) {
// 	return async function (dispatch) {
// 		dispatch(asyncActionStart());
// 		try {
// 			await delay(1000);
// 			dispatch({ type: DECREMENT_COUNTER, payload: amount });
// 			dispatch(asyncActionFinish());
// 		} catch (error) {
// 			dispatch(asyncActionError(error));
// 			toast.error(error);
// 		}
// 	};
// }

// export default function testReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case INCREMENT_COUNTER:
// 			return {
// 				...state,
// 				data: state.data + action.payload,
// 			};
// 		case DECREMENT_COUNTER:
// 			return {
// 				...state,
// 				data: state.data - action.payload,
// 			};
// 		default:
// 			return state;
// 	}
// }
