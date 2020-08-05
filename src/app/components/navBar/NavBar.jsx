import React, { useState } from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useHistory } from 'react-router-dom';

const NavBar = ({ setFormOpen }) => {
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(false);

	function handleSignOut() {
		setAuthenticated(false);
		history.push('/');
	}

	return (
		<div>
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item header exact as={NavLink} to='/'>
						<img src={require('../../../assets/images/logo.png')} alt='logo' />
						Re-vents
					</Menu.Item>
					<Menu.Item as={NavLink} to='/events' name='Events' />
					<Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
					{authenticated ? (
						<Menu.Item as={NavLink} to='/createEvent'>
							<Button floated='right' positive inverted content='Create Event' />
						</Menu.Item>
					) : (
						''
					)}
					{authenticated ? (
						<SignedInMenu setAuthenticated={setAuthenticated} SignOut={handleSignOut} />
					) : (
						<SignedOutMenu setAuthenticated={setAuthenticated} />
					)}
				</Container>
			</Menu>
		</div>
	);
};

export default NavBar;
