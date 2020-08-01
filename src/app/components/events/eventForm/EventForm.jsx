import React, { useState } from 'react';
import { Segment, Form, Button, Header } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';

const EventForm = ({ setFormOpen, setEvents, createEvent, selectedEvent, updateEvent }) => {
	const initialValues = selectedEvent
		? selectedEvent
		: {
				title: '',
				city: '',
				venue: '',
				date: '',
				host: '',
				attendees: '',
				id: '',
		  };

	const [values, setValues] = useState(initialValues);

	const handleFormSubmit = () => {
		selectedEvent
			? updateEvent({ ...selectedEvent, ...values })
			: createEvent({
					...values,
					id: cuid(),
					attendees: [],
					hostPhotoURL: '../../../assets/images/user.png',
			  });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	return (
		<Segment>
			<Header content={selectedEvent ? 'Edit Event' : 'Create Event'} />
			<Form onSubmit={handleFormSubmit}>
				<Form.Field>
					<label>Event Title</label>
					<input
						placeholder='Event Name'
						name='title'
						value={values.title}
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<label>Event Date</label>
					<input
						type='date'
						name='date'
						placeholder='Event Date'
						onChange={(e) => handleInputChange(e)}
					/>
				</Form.Field>
				<Form.Field>
					<label>City</label>
					<input
						placeholder='City event is taking place'
						type='text'
						value={values.city}
						name='city'
						onChange={(e) => {
							handleInputChange(e);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Venue</label>
					<input
						placeholder='Enter the Venue of the event'
						type='text'
						name='venue'
						value={values.venue}
						onChange={(e) => {
							handleInputChange(e);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Hosted By</label>
					<input
						placeholder='Enter the name of person hosting'
						type='text'
						name='host'
						value={values.host}
						onChange={(e) => {
							handleInputChange(e);
						}}
					/>
				</Form.Field>
				<Button positive type='submit'>
					Submit
				</Button>
				<Button type='button' as={Link} to={'/events'}>
					Cancel
				</Button>
			</Form>
		</Segment>
	);
};

export default EventForm;
