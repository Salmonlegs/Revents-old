import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

export default function EventMap({ event }) {
	const zoom = 12;

	function Marker() {
		return <Icon name='marker' size='big' color='red' />;
	}

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: '20rem', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyDB7Q6qfPfgaQOiOW0GGryZ0VPUkvqrNi4' }}
				center={event.city.latLng}
				zoom={zoom}
			>
				<Marker lat={event.city.latLng.lat} lng={event.city.latLng.lng} />
			</GoogleMapReact>
		</div>
	);
}
