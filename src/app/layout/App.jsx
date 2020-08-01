import React, { useState, Fragment } from 'react';
import EventDashboard from '../components/events/eventDashboard/EventDashboard';
import NavBar from '../components/navBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import HomePage from '../components/home/HomePage';

import EventForm from '../components/events/eventForm/EventForm';
import EventDetailedPage from '../components/events/eventDetailed/EventDetailedPage';

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
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar setFormOpen={handleCreateFormOpen} />
						<Container className='main'>
							<Route exact path='/events' component={EventDashboard} />
							<Route path='/events/:id' component={EventDetailedPage} />
							<Route path='/createEvent' component={EventForm} />
						</Container>
					</>
				)}
			/>
		</Fragment>
	);
};

export default App;
