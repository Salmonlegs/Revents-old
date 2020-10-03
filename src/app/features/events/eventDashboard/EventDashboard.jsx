import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector, useDispatch } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { listenToEvents, listenToEventsFromFirestore } from '../../../firestore/firestoreService';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import EventsFeed from './EventsFeed';

const EventDashboard = () => {
	const dispatch = useDispatch();
	const { events } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);
	const { authenticated } = useSelector((state) => state.auth);
	const [predicate, setPredicate] = useState(
		new Map([
			['startDate', new Date()],
			['filter', 'all'],
		]),
	);

	function handleSetPredicate(key, value) {
		setPredicate(new Map(predicate.set(key, value)));
	}

	useFirestoreCollection({
		query: () => listenToEventsFromFirestore(predicate),
		data: (events) => dispatch(listenToEvents(events)),
		deps: [dispatch, predicate],
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
					{authenticated && <EventsFeed />}
					<EventFilters setPredicate={handleSetPredicate} predicate={predicate} loading={loading} />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default EventDashboard;
