import React from 'react';
import { Segment, Item, Icon, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function EventListItem({ event }) {
	return (
		<div style={{ paddingBottom: '1rem' }}>
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image
								size='tiny'
								circular
								src={
									event.hostPhotoURL
										? event.hostPhotoURL
										: require('../../../../assets/images/user.png')
								}
							/>
							<Item.Content>
								<Item.Header as='a' content={event.title}></Item.Header>
								<Item.Description>Hosted by {event.hostedBy}</Item.Description>
								{event.isCancelled && (
									<Label
										style={{ top: '-40px' }}
										ribbon='right'
										color='red'
										content='This event has been cancelled'
									/>
								)}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name='clock' /> {format(event.date, 'MMMM d, yyyy h:mm a')} &nbsp;&nbsp;
						<Icon name='marker' /> {event.venue.address}
					</span>
				</Segment>
				<Segment secondary>
					{event.attendees.map((attendee) => (
						<EventListAttendee attendee={attendee} key={attendee.id} />
					))}
				</Segment>
				<Segment clearing>
					<span>{event.description}</span>

					<Button
						color='red'
						floated='right'
						content='Delete Event'
						onClick={() => {
							//console.log(deleteEventInFirestore(event.id));
						}}
					/>
					<Button
						as={Link}
						to={`/events/${event.id}`}
						color='teal'
						floated='right'
						content='View'
					/>
				</Segment>
			</Segment.Group>
		</div>
	);
}
