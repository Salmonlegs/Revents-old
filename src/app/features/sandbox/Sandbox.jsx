import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';
import { openModal } from '../../common/modals/modalReducer';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import MousePointerButton from './MousePointerButton';

export default function Sandbox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);
	const { loading } = useSelector((state) => state.async);
	const defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33,
		},
		zoom: 11,
	};
	const [location, setLocation] = useState(defaultProps);

	const [target, setTarget] = useState(null);

	const [counter, setCounter] = useState(0);

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

	return (
		<div>
			<h1>Testing 123</h1>
			<h1>The data is: {data}</h1>
			<Button
				name='increment'
				loading={loading && target === 'increment'}
				content='Increment'
				color='green'
				onClick={(e) => {
					dispatch(increment(5));
					setTarget(e.target.name);
				}}
			/>
			<Button
				name='decrement'
				loading={loading && target === 'decrement'}
				content='Decrement'
				color='red'
				onClick={(e) => {
					dispatch(decrement(10));
					setTarget(e.target.name);
				}}
			/>

			<Button
				content='Open Modal'
				color='teal'
				onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))}
			/>

			<Button content={counter} onClick={() => setCounter(counter + 1)} />
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
