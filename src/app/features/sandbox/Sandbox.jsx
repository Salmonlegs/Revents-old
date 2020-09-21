import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementAction, decrementAction } from './testReducer';
import { openModal } from '../../common/modals/modalReducer';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import MousePointerButton from './MousePointerButton';
import { getCake } from './dessertReducer';

export default function Sandbox() {
	const dispatch = useDispatch();

	const cakeCount = useSelector((state) => state.dessert.cakeCount);
	const [inputValues, setInputValues] = useState(0);
	const data = useSelector((state) => state.test.data);
	const defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33,
		},
		zoom: 11,
	};
	const [location, setLocation] = useState(defaultProps);
	const [user, setUser] = useState({ firstName: '', lastName: '' });

	function handleSetLocation(latLng) {
		setLocation({
			...location,
			center: {
				lat: latLng.lat,
				lng: latLng.lng,
			},
		});
	}

	function handleGetCake(numOfCakes) {
		//console.log('numOfCakes', numOfCakes);
		dispatch(getCake(numOfCakes));
	}

	return (
		<div>
			<div style={{ paddingBottom: '5rem' }}>
				<h1>Welcome to the cake store</h1>
				<h2>Choose from {cakeCount} cakes</h2>
				<p>How many cakes which would you like?</p>
				<div style={{ paddingBottom: '1rem' }}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							//console.log('e', e);
							handleGetCake(inputValues);
						}}
					>
						<input
							type='number'
							size='small'
							name='numOfCakes'
							onChange={(e) => setInputValues(e.target.value)}
						></input>
						<Button type='submit'>Click Me</Button>
					</form>
				</div>
			</div>

			<h1>The score is: {data}</h1>
			<Button content='Increment' color='green' onClick={() => dispatch(incrementAction())} />
			<Button
				content='Decrement'
				color='red'
				onClick={() => {
					console.log(decrementAction);
					dispatch(decrementAction());
				}}
			/>

			<Button
				content='Open Modal'
				color='teal'
				onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))}
			/>

			<div style={{ paddingTop: '0.5rem' }}>
				<input
					style={{ marginRight: '1rem' }}
					type='text'
					value={user.firstName}
					onChange={(e) => setUser({ ...user, firstName: e.target.value })}
				/>
				<input
					type='text'
					value={user.lastName}
					onChange={(e) => setUser({ ...user, lastName: e.target.value })}
				/>
				<div style={{ paddingTop: '0.5rem' }}>
					<span>{user.firstName} </span>
					<span>{user.lastName}</span>
				</div>
			</div>
			<MousePointerButton />
			<div style={{ marginTop: '15px' }}>
				<TestPlaceInput handleSetLocation={handleSetLocation} />
				<TestMap location={location} />
			</div>
		</div>
	);
}
