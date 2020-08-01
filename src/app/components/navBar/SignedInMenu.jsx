import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function SignedInMenu({ setAuthenticated, SignOut }) {
	return (
		<Menu.Item position='right'>
			<Image avatar spaced='right' src={require('../../../assets/images/user.png')} />
			<Dropdown pointing='top left' text='Bob'>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
					<Dropdown.Item to='/createEvent' text='My Profile' icon='user' />
					<Dropdown.Item to='/createEvent' text='Sign Out' icon='power' onClick={() => SignOut()} />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
