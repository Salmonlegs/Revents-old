import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedChat from './EventDetailedChat';
import { useSelector, useDispatch } from 'react-redux';
import { listenToEventFromFirestore } from '../../../firestore/firestoreService';
import useFirestoreDoc from '../../../hooks/useFirestoreDoc';
import { listenToEvents } from '../eventActions';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

export default function EventDetailedPage({ match }) {
	const dispatch = useDispatch();
	const event = useSelector((state) => {
		return state.event.events.find((e) => e.id === match.params.id);
	});

	const { loading, error } = useSelector((state) => state.async);

	useFirestoreDoc({
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id],
	});

	if (loading || (!event && !error)) return <LoadingComponent content='Loading Event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event} />
				<EventDetailedInfo event={event} />
				<EventDetailedChat event={event} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailedSidebar attendees={event ? event.attendees : null} />
			</Grid.Column>
		</Grid>
	);
}
