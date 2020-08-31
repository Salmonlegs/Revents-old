import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector, useDispatch } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { listenToEvents, listenToEventsFromFirestore } from '../../../firestore/firestoreService';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';

const EventDashboard = () => {
	const dispatch = useDispatch();
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);

	useFirestoreCollection({
		query: () => listenToEventsFromFirestore(),
		data: (events) => dispatch(listenToEvents(events)),
		deps: [dispatch],
	});

	return (
		<div>
			<Grid columns={2}>
				<Grid.Column width={10}>
					{loading && (
						<>
							<EventListItemPlaceholder />
							<EventListItemPlaceholder />
						</>
					)}
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventFilters />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default EventDashboard;
