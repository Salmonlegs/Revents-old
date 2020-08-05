import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './eventList/EventList';
import { useSelector } from 'react-redux';

const EventDashboard = () => {
	const { events } = useSelector((state) => state.event);

	return (
		<div>
			<Grid columns={2}>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<h2>Event Filters</h2>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default EventDashboard;
