import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header, Segment } from 'semantic-ui-react';
import { getUserFeedRef } from '../../../firestore/firebaseService';
import { firebaseObjectToArray } from '../../../firestore/firestoreService';
import { listenToFeed } from '../../profilePage/profileActions';
import EventFeedItem from './EventFeedItem';

export default function EventsFeed() {
	const dispatch = useDispatch();
	const { feed } = useSelector((state) => state.profile);

	useEffect(() => {
		getUserFeedRef().on('value', (snapshot) => {
			if (!snapshot.exists()) {
				return;
			}
			const feed = firebaseObjectToArray(snapshot.val()).reverse();
			dispatch(listenToFeed(feed));
		});
		return () => {
			getUserFeedRef().off();
		};
	}, [dispatch]);

	const image = require('../../../../assets/images/user.png');
	const date = '3 days ago';
	const summary = 'Diana joins an event';

	return (
		<>
			<Header attached color='teal' icon='newspaper' content='News Feed' />
			<Segment attached='bottom'>
				<Feed>
					{feed.map((post) => (
						<EventFeedItem post={post} key={post.id} />
					))}
				</Feed>
			</Segment>
		</>
	);
}
