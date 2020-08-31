import React, { useState, Fragment } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventMap from './EventMap';

export default function EventDetailedInfo({ event }) {
	const [openMap, setOpenMap] = useState(false);

	function handleMap() {
		if (openMap === false) {
			setOpenMap(true);
		} else {
			setOpenMap(false);
		}
	}

	return (
		<Fragment>
			<Segment.Group>
				<Segment attached='top'>
					<Grid columns={2}>
						<Grid.Column width={1}>
							<Icon size='large' color='teal' name='info' />
						</Grid.Column>
						<Grid.Column width={15}>
							<p>{event.description}</p>
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment attached>
					<Grid verticalAlign='middle'>
						<Grid.Column width={1}>
							<Icon name='calendar' size='large' color='teal' />
						</Grid.Column>
						<Grid.Column width={15}>
							<span>{format(event.date, 'MMMM d, yyyy h:mm a')}</span>
						</Grid.Column>
					</Grid>
				</Segment>
				<Segment attached>
					<Grid verticalAlign='middle'>
						<Grid.Column width={1}>
							<Icon name='marker' size='large' color='teal' />
						</Grid.Column>
						<Grid.Column width={11}>
							<span>{event.venue.address}</span>
						</Grid.Column>
						<Grid.Column width={4}>
							<Button
								color='teal'
								size='tiny'
								content={openMap === false ? 'Show Map' : 'Hide Map'}
								onClick={handleMap}
							/>
						</Grid.Column>
					</Grid>
				</Segment>
				{openMap ? (
					<Segment attached>
						<EventMap event={event} />
					</Segment>
				) : (
					''
				)}
			</Segment.Group>
		</Fragment>
	);
}
