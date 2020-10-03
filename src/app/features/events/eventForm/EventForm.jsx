/* global google */
import React from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../common/form/MyTextInput';
import MyTextArea from '../../../common/form/MyTextArea';
import MySelectInput from '../../../common/form/MySelectInput';
import { categoryData } from '../../../api/CategoryOptions';
import MyDateInput from '../../../common/form/MyDateInput';
import MyPlaceInput from '../../../common/form/MyPlaceInput';
import useFirestoreDoc from '../../../hooks/useFirestoreDoc';
import {
	listenToEventFromFirestore,
	updateEventInFirestore,
	addEventToFirestore,
	cancelEventToggle,
} from '../../../firestore/firestoreService';
import LoadingComponent from '../../../layout/LoadingComponent';
import { toast } from 'react-toastify';
import { listenToSelectedEvent } from '../eventActions';

const EventForm = ({ match, history }) => {
	const dispatch = useDispatch();
	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id),
	);
	const { loading, error } = useSelector((state) => state.async);

	const initialValues = selectedEvent
		? selectedEvent
		: {
				title: '',
				city: {
					address: '',
					latLng: null,
				},
				venue: {
					address: '',
					latLng: null,
				},
				date: '',
				host: '',
				attendees: '',
				id: '',
		  };

	const validationSchema = Yup.object({
		title: Yup.string().required('You must provide a title'),
		category: Yup.string().required('You must provide a category'),
		description: Yup.string().required('You must provide a description'),
		city: Yup.object().shape({
			address: Yup.string().required('City is required'),
		}),
		venue: Yup.object().shape({
			address: Yup.string().required('Venue is required'),
		}),
		date: Yup.string().required('You must provide a date'),
	});

	useFirestoreDoc({
		shouldExecute: !!match.params.id,
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToSelectedEvent(event)),
		deps: [match.params.id],
	});

	if (loading) return <LoadingComponent content='Loading Event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Segment style={{ height: 'fit-content' }}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventInFirestore(values)
							: await addEventToFirestore(values);
						setSubmitting(false);

						history.push('/events');
					} catch (error) {
						toast.error(error.message);
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event Details' />
						<MyTextInput name='title' placeholder='Event title' />
						<MySelectInput name='category' placeholder='Event category' options={categoryData} />

						<MyTextArea name='description' placeholder='Description' rows={3} />
						<Header sub color='teal' content='Events Location Details' />
						<MyPlaceInput name='city' placeholder='City' />
						<MyPlaceInput
							name='venue'
							disabled={!values.city.latLng}
							placeholder='Venue'
							options={{
								location: new google.maps.LatLng(values.city.latLng),
								radius: 1000,
								types: ['establishment'],
							}}
						/>
						<MyDateInput
							name='date'
							placeholderText='Event Date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							dateFormate='MMMM d, yyyy h:mm a'
						/>
						<div style={{ paddingTop: '1rem' }}>
							{selectedEvent && (
								<Button
									type='button'
									color={selectedEvent.isCancelled ? 'green' : 'red'}
									content={selectedEvent.isCancelled ? 'Reactivate Event' : 'Cancel Event'}
									floated='left'
									f
									onClick={() => {
										cancelEventToggle(selectedEvent);
									}}
								/>
							)}
							<Button
								content='Submit'
								loading={isSubmitting}
								positive
								type='submit'
								floated='right'
								disabled={!isValid || !dirty || isSubmitting}
							/>

							<Button
								type='button'
								as={Link}
								to={'/events'}
								content='Cancel'
								floated='right'
								disabled={isSubmitting}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</Segment>
	);
};

export default EventForm;
