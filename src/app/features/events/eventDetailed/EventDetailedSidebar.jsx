import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Label } from 'semantic-ui-react';

export default function EventDetailedSidebar({ attendees, eventHost, hostUid }) {
	return (
		<>
			{console.log('attendees', attendees)}
			<Segment
				textAlign='center'
				style={{ border: 'none' }}
				attached='top'
				secondary
				inverted
				color='teal'
			>
				{attendees.length}{' '}
				{attendees.length > 1
					? 'People Going'
					: attendees.length === 1
					? 'Person Going'
					: 'Nobody Going Yet'}
			</Segment>
			<Segment attached>
				<Item.Group relaxed divided>
					{attendees.map((attendee) => {
						return (
							<Item
								as={Link}
								to={`/profile/${attendee.id}`}
								key={attendee.id}
								style={{ position: 'relative' }}
							>
								{hostUid === attendee.id && (
									<Label style={{ position: 'absolute' }} as='a' color='blue' ribbon='right'>
										Host
									</Label>
								)}
								<Item.Image
									size='tiny'
									src={attendee.photoURL || require('../../../../assets/images/user.png')}
								/>
								<Item.Content verticalAlign='middle'>
									<Item.Header>
										<span>{attendee.displayName}</span>
									</Item.Header>
								</Item.Content>
							</Item>
						);
					})}
				</Item.Group>
			</Segment>
		</>
	);
}
