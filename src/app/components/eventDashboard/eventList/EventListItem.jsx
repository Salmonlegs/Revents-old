import React, { Component, Fragment } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
	render() {
		const { event } = this.props;
		return (
			<div style={{ paddingBottom: '1rem' }}>
				<Segment.Group>
					<Segment>
						<Item.Group>
							<Item>
								<Item.Image size='tiny' circular src={event.hostPhotoURL} />
								<Item.Content>
									<Item.Header as='a' content={event.title}></Item.Header>
									<Item.Description>Hosted by {event.hostedBy}</Item.Description>
								</Item.Content>
							</Item>
						</Item.Group>
					</Segment>
					<Segment>
						<span>
							<Icon name='clock' /> {event.date}
							<Icon name='marker' /> {event.venue}
						</span>
					</Segment>
					<Segment secondary>
						{event.attendees.map((attendee) => (
							<EventListAttendee attendee={attendee} key={attendee.id} />
						))}
					</Segment>
					<Segment clearing>
						<span>{event.description}</span>
						<Button as='a' color='teal' floated='right' content='View' />
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}

export default EventListItem;
