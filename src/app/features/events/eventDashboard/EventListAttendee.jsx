import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
	render() {
		const { attendee } = this.props;
		return (
			<List horizontal>
				<List.Item style={{ paddingRight: '0.5rem' }} as={Link} to={`/profile/${attendee.id}`}>
					<Image size='mini' circular src={attendee.photoURL} style={{}} />
				</List.Item>
			</List>
		);
	}
}

export default EventListAttendee;
