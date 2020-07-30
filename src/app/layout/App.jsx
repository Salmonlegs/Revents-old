import React, { useState, Fragment } from 'react';
import EventDashboard from '../components/eventDashboard/EventDashboard';
import NavBar from '../components/navBar/NavBar';
import { Container } from 'semantic-ui-react';

const App = () => {
	const [formOpen, setFormOpen] = useState(false);

	return (
		<Fragment>
			<NavBar setFormOpen={setFormOpen} />
			<Container className='main'>
				<EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
			</Container>
		</Fragment>
	);
};

export default App;
