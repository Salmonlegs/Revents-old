import React, { useState } from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { addUserAttendance, cancelUserAttendance } from '../../../firestore/firestoreService';
import { toast } from 'react-toastify';

const eventImageStyle = {
	filter: 'brightness(30%)',
};

const eventImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

export default function EventDetailedHeader({ event, isHost, isGoing }) {
	const [loading, setLoading] = useState(false);

	async function handleUserJoinEvent(event) {
		console.log('handleUserJoinEvent event', event);
		setLoading(true);
		try {
			await addUserAttendance(event);
		} catch (error) {
			console.log('addUserAttendance', error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	async function handleUserLeaveEvent(event) {
		console.log('handleUserJoinEvent event', event);
		setLoading(true);
		try {
			await cancelUserAttendance(event);
		} catch (error) {
			console.log('addUserAttendance', error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: '0' }}>
				<Image
					src={require(`../../../../assets/categoryImages/${event.category}.jpg`)}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header size='huge' content={event.title} style={{ color: 'white' }} />
								<p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
								<p>
									Hosted by{' '}
									<strong>
										<Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
									</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached='bottom' clearing>
				{!isHost && (
					<>
						{console.log('isGoing', isGoing)}
						{isGoing ? (
							<Button loading={loading} onClick={() => handleUserLeaveEvent(event)}>
								Cancel My Place
							</Button>
						) : (
							<Button color='teal' loading={loading} onClick={() => handleUserJoinEvent(event)}>
								JOIN THIS EVENT
							</Button>
						)}
					</>
				)}
				{isHost && (
					<Button as={Link} to={`/manage/${event.id}`} color='orange' floated='right'>
						Manage Event
					</Button>
				)}
			</Segment>
		</Segment.Group>
	);
}
