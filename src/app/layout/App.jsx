import React, { Fragment } from 'react';
import EventDashboard from '../features/events/eventDashboard/EventDashboard';
import NavBar from '../features/navBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';

import EventForm from '../features/events/eventForm/EventForm';
import EventDetailedPage from '../features/events/eventDetailed/EventDetailedPage';
import Sandbox from '../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';

const App = () => {
	const { key } = useLocation();
	return (
		<Fragment>
			<ModalManager />
			<Route exact path='/' component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<Container className='main'>
							<Route exact path='/events' component={EventDashboard} />
							<Route exact path='/sandbox' component={Sandbox} />
							<Route path='/events/:id' component={EventDetailedPage} />
							<Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
						</Container>
					</>
				)}
			/>
		</Fragment>
	);
};

export default App;
