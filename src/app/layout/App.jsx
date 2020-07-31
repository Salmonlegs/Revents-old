import React, { useState, Fragment } from 'react';
import EventDashboard from '../components/eventDashboard/EventDashboard';
import NavBar from '../components/navBar/NavBar';
import { Container } from 'semantic-ui-react';

const App = () => {
	const [formOpen, setFormOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const handleSelectEvent = (event) => {
		setSelectedEvent(event);
		setFormOpen(true);
	};

	const handleCreateFormOpen = () => {
		setFormOpen(true);
		setSelectedEvent(null);
	};

	return (
		<Fragment>
			<NavBar setFormOpen={handleCreateFormOpen} />
			<Container className='main'>
				<EventDashboard
					formOpen={formOpen}
					setFormOpen={setFormOpen}
					selectEvent={handleSelectEvent}
					selectedEvent={selectedEvent}
				/>
			</Container>
		</Fragment>
	);
};

export default App;
