import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector, useDispatch } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import EventsFeed from './EventsFeed';
import { clearEvents, fetchEvents } from '../eventActions';

const EventDashboard = () => {
	const limit = 2;
	const dispatch = useDispatch();
	const { events, moreEvents } = useSelector((state) => state.event);
	const { loading } = useSelector((state) => state.async);
	const { authenticated } = useSelector((state) => state.auth);

	const [initialLoad, setInitialLoad] = useState(true);
	const [lastDocSnapshot, setLastDocSnapshot] = useState(false);
	const [predicate, setPredicate] = useState(
		new Map([
			['startDate', new Date()],
			['filter', 'all'],
		]),
	);

	function handleSetPredicate(key, value) {
		dispatch(clearEvents());
		setLastDocSnapshot(null);
		setPredicate(new Map(predicate.set(key, value)));
	}

	useEffect(() => {
		setInitialLoad(true);
		dispatch(fetchEvents(predicate, limit)).then((lastVisible) => {
			console.log('lastVisible', lastVisible);
			setLastDocSnapshot(lastVisible);
			setInitialLoad(false);
		});
		return () => {
			dispatch(clearEvents());
		};
	}, [dispatch, predicate]);

	function handleFetchNextEvents() {
		dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then((lastVisible) => {
			setLastDocSnapshot(lastVisible);
		});
	}

	return (
		<div>
			<Grid columns={2}>
				<Grid.Column width={10}>
					{initialLoad && (
						<>
							<EventListItemPlaceholder />
							<EventListItemPlaceholder />
						</>
					)}
					<EventList
						events={events}
						getNextEvents={handleFetchNextEvents}
						loading={loading}
						moreEvents={moreEvents}
					/>
					{/* <Button
						disabled={!moreEvents}
						loading={loading}
						onClick={handleFetchNextEvents}
						color='green'
						content='More...'
						style={{ float: 'right' }}
					/> */}
				</Grid.Column>
				<Grid.Column width={6}>
					{authenticated && <EventsFeed />}
					<EventFilters setPredicate={handleSetPredicate} predicate={predicate} loading={loading} />
				</Grid.Column>
				<Grid.Column width={10}>
					<Loader active={loading} />
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default EventDashboard;
