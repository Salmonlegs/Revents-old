import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOutFirebase } from '../../firestore/firebaseService';
import { toastr } from 'react-redux-toastr';

export default function SignedInMenu() {
	const { currentUserProfile } = useSelector((state) => state.profile);
	const history = useHistory();
	//console.log('currentUserProfile', currentUserProfile);
	async function handleSignOut() {
		try {
			await signOutFirebase();
			history.push('/');
		} catch (error) {
			toastr.error(error.message);
		}
	}
	return (
		<Menu.Item position='right'>
			<Image
				avatar
				spaced='right'
				src={currentUserProfile.photoURL || '../../../assets/images/user.png'}
			/>
			<Dropdown pointing='top left' text={currentUserProfile.displayName}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
					<Dropdown.Item
						as={Link}
						to={`/profile/${currentUserProfile.id}`}
						text='My Profile'
						icon='user'
					/>
					<Dropdown.Item as={Link} to='/account' text='My Account' icon='settings' />
					<Dropdown.Item
						to='/createEvent'
						text='Sign Out'
						icon='power'
						onClick={() => {
							handleSignOut();
						}}
					/>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
}
