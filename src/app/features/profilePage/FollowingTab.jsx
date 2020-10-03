import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { getFollowersCollection, getFollowingCollection } from '../../firestore/firestoreService';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { listenToFollowers, listenToFollowing } from './profileActions';
import ProfileCard from './ProfileCard';

export default function FollowingTab({ profile, activeTab }) {
	const dispatch = useDispatch();
	const { following, followers } = useSelector((state) => state.profile);

	useFirestoreCollection({
		query:
			activeTab === 3
				? () => getFollowersCollection(profile.id)
				: () => getFollowingCollection(profile.id),
		data: (data) =>
			activeTab === 3 ? dispatch(listenToFollowers(data)) : dispatch(listenToFollowing(data)),
		deps: [dispatch, activeTab],
	});

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated='left'
						icon='user'
						content={activeTab === 3 ? 'Followers' : 'Following'}
					></Header>
				</Grid.Column>
				<Grid.Column width={16}>
					<Card.Group itemsPerRow={5}>
						{activeTab === 3 &&
							followers?.map((profile) => <ProfileCard profile={profile} key={profile.id} />)}
						{activeTab === 4 &&
							following?.map((profile) => <ProfileCard profile={profile} key={profile.id} />)}
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
}
