import React, { useState } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from './eventList/EventList';
import EventForm from '../eventForm/EventForm';
import { sampleData } from '../../../api/sampleData';

const EventDashboard = ({ formOpen, setFormOpen, selectedEvent, selectEvent }) => {
	const [events, setEvents] = useState(sampleData);

	const handleCreateEvents = (event) => {
		setEvents([...events, event]);
	};

	const handleUpdateEvent = (updatedEvent) => {
		setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
		selectEvent(null);
	};

	const handleDeleteEvent = (eventId) => {
		setEvents(events.filter((event) => event.id != eventId));
	};

	return (
		<div>
			<Grid columns={2}>
				<Grid.Column width={10}>
					<EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent} />
				</Grid.Column>
				<Grid.Column width={6}>
					{formOpen && (
						<EventForm
							setFormOpen={setFormOpen}
							setEvents={setEvents}
							createEvent={handleCreateEvents}
							selectedEvent={selectedEvent}
							key={selectedEvent ? selectedEvent.id : null}
							updateEvent={handleUpdateEvent}
						/>
					)}
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default EventDashboard;
