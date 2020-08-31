import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ErrorComponent() {
	const { error } = useSelector((state) => state.async);
	return (
		<Segment placeholder>
			<Header textAlign='center' content={error ? error.message : 'Shwoops, we have an error'} />

			<Button as={Link} to='/events' primary style={{ marginTop: '20px' }}>
				Return to events
			</Button>
		</Segment>
	);
}
