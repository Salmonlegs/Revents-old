import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './AboutTab';
import EventsTab from './EventsTab';
import FollowingTab from './FollowingTab';
import PhotosTab from './PhotosTab';

export default function ProfileContent({ profile, isCurrentUser }) {
	const [activeTab, setActiveTab] = useState([0]);

	const panes = [
		{
			menuItem: 'About',
			render: () => (
				<Tab.Pane>
					<AboutTab profile={profile} isCurrentUser={isCurrentUser} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Photos',
			render: () => (
				<Tab.Pane>
					<PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Events',
			render: () => (
				<Tab.Pane>
					<EventsTab profile={profile} />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Followers',
			render: () => <FollowingTab key={profile.id} activeTab={activeTab} profile={profile} />,
		},
		{
			menuItem: 'Following',
			render: () => <FollowingTab key={profile.id} activeTab={activeTab} profile={profile} />,
		},
	];
	return (
		<>
			<Tab
				menu={{ fluid: true, vertical: true }}
				menuPosition='right'
				panes={panes}
				onTabChange={(e, data) => setActiveTab(data.activeIndex)}
			/>
		</>
	);
}
