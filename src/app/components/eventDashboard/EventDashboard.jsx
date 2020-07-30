import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './eventList/EventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../api/sampleData';

const EventDashboard = ({ formOpen, setFormOpen }) => {
	const [events, setEvents] = useState(sampleData);

	return (
		<div>
			<Grid columns={2}>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button positive content='Create event' />

					{formOpen && <EventForm setFormOpen={setFormOpen} />}
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default EventDashboard;
