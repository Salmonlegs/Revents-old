import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { increment, decrement } from './testReducer';
import { openModal } from '../../common/modals/modalReducer';

export default function Sandbox() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.test.data);

	return (
		<div>
			<h1>Testing 123</h1>
			<h1>The data is: {data}</h1>
			<Button content='Increment' color='green' onClick={() => dispatch(increment(5))} />
			<Button content='Decrement' color='red' onClick={() => dispatch(decrement(10))} />
			<Button
				content='Open Modal'
				color='teal'
				onClick={() => dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))}
			/>
		</div>
	);
}
