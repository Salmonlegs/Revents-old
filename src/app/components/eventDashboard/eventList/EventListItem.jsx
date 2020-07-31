import React, { Component } from 'react';
import { Segment, Item, Icon, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
	render() {
		const { event, selectEvent } = this.props;
		const { selectedEvent, setSelectedEvent, deleteEvent } = this.props;
		return (
			<div style={{ paddingBottom: '1rem' }}>
				<Segment.Group>
					<Segment>
						<Item.Group>
							<Item>
								<Item.Image size='tiny' circular src={event.hostPhotoURL} />
								<Item.Content>
									<Item.Header as='a' content={event.title}></Item.Header>
									<Item.Description>Hosted by {event.host}</Item.Description>
								</Item.Content>
							</Item>
						</Item.Group>
					</Segment>
					<Segment>
						<span>
							<Icon name='clock' /> {event.date} &nbsp;&nbsp;
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
						<Button
							as='a'
							color='red'
							floated='right'
							content='Delete Event'
							onClick={() => deleteEvent(event.id)}
						/>
						<Button
							as='a'
							color='teal'
							floated='right'
							content='View'
							onClick={() => selectEvent(event)}
						/>
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}

export default EventListItem;
