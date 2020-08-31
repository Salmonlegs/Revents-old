import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
	render() {
		const { attendee } = this.props;
		return (
			<List horizontal>
				<List.Item style={{ paddingRight: '0.5rem' }}>
					<Image as='a' size='mini' circular src={attendee.photoURL} style={{}} />
				</List.Item>
			</List>
		);
	}
}

export default EventListAttendee;
