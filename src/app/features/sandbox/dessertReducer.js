const PURCHASE_CAKE = 'PURCHASE_CAKE';
const PURCHASE_ICECREAM = 'PURCHASE_ICECREAM';
const STOCKUP_CAKE = 'STOCKUP_CAKE';

const initialState = {
	cakeCount: 20,
	icecreamCount: 5,
};

//ACTION && ACTION CREATOR

export function buyIcecream() {
	return {
		type: PURCHASE_ICECREAM,
	};
}

export function getCake(value) {
	return {
		type: PURCHASE_CAKE,
		payload: value,
	};
}

export function stockUpCake() {
	return {
		type: STOCKUP_CAKE,
	};
}

//REDUCER
// (previous state, action) ==> newstate

export default function dessertReducer(state = initialState, { type, payload }) {
	switch (type) {
		case PURCHASE_ICECREAM:
			return {
				...state,
			};

		case PURCHASE_CAKE:
			//console.log(state.cakeCount);
			return {
				...state,
				cakeCount: state.cakeCount - payload,
			};
		case STOCKUP_CAKE:
			return {
				...state,
				cakeCount: state.cakeCount + 5,
			};
		default:
			return state;
	}
}
