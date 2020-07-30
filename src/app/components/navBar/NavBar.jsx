import React from 'react';
import { Menu, Button, Container } from 'semantic-ui-react';

const NavBar = ({ setFormOpen }) => {
	return (
		<div>
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item header>
						<img src={require('../../../assets/images/logo.png')} alt='logo' />
						Re-vents
					</Menu.Item>
					<Menu.Item name='Events' />
					<Menu.Item>
						<Button
							floated='right'
							positive
							inverted
							content='Create Event'
							onClick={() => setFormOpen(true)}
						/>
					</Menu.Item>
					<Menu.Item position='right'>
						<Button basic inverted content='Login' />
						<Button basic inverted content='Sign Out' style={{ marginLeft: '0.5em' }} />
					</Menu.Item>
				</Container>
			</Menu>
		</div>
	);
};

export default NavBar;
