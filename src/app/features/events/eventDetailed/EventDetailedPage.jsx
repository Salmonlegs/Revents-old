import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedChat from './EventDetailedChat';
import { useSelector, useDispatch } from 'react-redux';
import { listenToEventFromFirestore } from '../../../firestore/firestoreService';
import useFirestoreDoc from '../../../hooks/useFirestoreDoc';
import { listenToSelectedEvent } from '../eventActions';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

export default function EventDetailedPage({ match }) {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.auth);
	const event = useSelector((state) => state.event.selectedEvent);

	const { loading, error } = useSelector((state) => state.async);

	const isHost = event?.hostUid === currentUser.uid;

	const isGoing = event?.attendees?.some((a) => a.id === currentUser.uid);

	useFirestoreDoc({
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToSelectedEvent(event)),
		deps: [match.params.id],
	});

	if (loading || (!event && !error)) return <LoadingComponent content='Loading Event...' />;

	if (error) return <Redirect to='/error' />;

	return (
		<Grid>
			{console.log('event.attendees', event.attendees)}
			<Grid.Column width={10}>
				<EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} />
				<EventDetailedInfo event={event} />
				<EventDetailedChat event={event} eventId={event.id} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventDetailedSidebar hostUid={event.hostUid} attendees={event ? event.attendees : null} />
			</Grid.Column>
		</Grid>
	);
}
