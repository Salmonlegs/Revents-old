import React, { useState } from 'react';
import { Segment, Button, Header, FormField, Label } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../common/form/MyTextInput';
import MyTextArea from '../../../common/form/MyTextArea';
import MySelectInput from '../../../common/form/MySelectInput';
import { categoryData } from '../../../api/CategoryOptions';
import MyDateInput from '../../../common/form/MyDateInput';

const EventForm = ({ match, history }) => {
	const dispatch = useDispatch();
	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id),
	);

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

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title'),
		category: Yup.string().required('You must provide a category'),
		description: Yup.string().required('You must provide a description'),
		city: Yup.string().required('You must provide a city'),
		venue: Yup.string().required('You must provide a venue'),
		date: Yup.string().required('You must provide a date'),
	});

	return (
		<Segment>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					selectedEvent
						? dispatch(updateEvent({ ...selectedEvent, ...values }))
						: dispatch(
								createEvent({
									...values,
									id: cuid(),
									attendees: [],
									hostPhotoURL: '../../../assets/images/user.png',
								}),
						  );
					history.push('/events');
				}}
			>
				{({ isSubmitting, dirty, isValid }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />
						<MyTextInput name='title' placeholder='Event title' />
						<MySelectInput name='category' placeholder='Event category' options={categoryData} />

						<MyTextArea name='description' placeholder='Description' rows={3} />
						<Header sub color='teal' content='Events Location Details' />
						<MyTextInput name='city' placeholder='City' />
						<MyTextInput name='venue' placeholder='Venue' />
						<MyDateInput
							name='date'
							placeholderText='Event Date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormate='MMMM d, yyyy h:mm a'
						/>
						<Button
							content='Submit'
							loading={isSubmitting}
							positive
							type='submit'
							disabled={!isValid || !dirty || isSubmitting}
						/>

						<Button
							type='button'
							as={Link}
							to={'/events'}
							content='Cancel'
							disabled={isSubmitting}
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
};

console.log('MySelectInput', MySelectInput);

export default EventForm;
