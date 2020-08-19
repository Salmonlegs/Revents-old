import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../auth/authActions';
import { useHistory } from 'react-router-dom';

export default function SignedInMenu() {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.auth);
	const history = useHistory();
	return (
		<Menu.Item position='right'>
			<Image
				avatar
				spaced='right'
				src={currentUser.photoURL || '../../../assets/images/user.png'}
			/>
			<Dropdown pointing='top left' text={currentUser.email}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
					<Dropdown.Item to='/createEvent' text='My Profile' icon='user' />
					<Dropdown.Item
						to='/createEvent'
						text='Sign Out'
						icon='power'
						onClick={() => {
							dispatch(signOutUser());
							history.push('/');
						}}
					/>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}