import React from 'react';
import { Menu, Button, Container, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';

const NavBar = ({ setFormOpen }) => {
	const { authenticated } = useSelector((state) => state.auth);

	return (
		<div>
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item header exact as={NavLink} to='/'>
						<Image
							src={require('../../../assets/images/logo.png')}
							style={{ height: '3rem' }}
							alt='logo'
						/>
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
					{authenticated ? <SignedInMenu /> : <SignedOutMenu />}
				</Container>
			</Menu>
		</div>
	);
};

export default NavBar;
