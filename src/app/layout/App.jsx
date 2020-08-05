import React, { Fragment } from 'react';
import EventDashboard from '../components/events/eventDashboard/EventDashboard';
import NavBar from '../components/navBar/NavBar';
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../components/home/HomePage';

import EventForm from '../components/events/eventForm/EventForm';
import EventDetailedPage from '../components/events/eventDetailed/EventDetailedPage';
import Sandbox from '../components/sandbox/Sandbox';

const App = () => {
	const { key } = useLocation();
	return (
		<Fragment>
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
