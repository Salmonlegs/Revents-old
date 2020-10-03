import {
	LISTEN_TO_CURRENT_USER_PROFILE,
	LISTEN_TO_FEED,
	LISTEN_TO_FOLLOWERS,
	LISTEN_TO_FOLLOWING,
	LISTEN_TO_SELECTED_USER_PROFILE,
	LISTEN_TO_USER_EVENTS,
	LISTEN_TO_USER_PHOTOS,
	SET_FOLLOW_USER,
	SET_UNFOLLOW_USER,
} from './profileConstants';

export function listenToCurrentUserProfile(profile) {
	//console.log('listenToCurrentUserProfile', profile);
	return {
		type: LISTEN_TO_CURRENT_USER_PROFILE,
		payload: profile,
	};
}

export function listenToSelectedUserProfile(profile) {
	//console.log('listenToSelectedUserProfile', profile);
	return {
		type: LISTEN_TO_SELECTED_USER_PROFILE,
		payload: profile,
	};
}

export default function listenToUserPhotos(photos) {
	return {
		type: LISTEN_TO_USER_PHOTOS,
		payload: photos,
	};
}

export function listenToUserEvents(events) {
	return {
		type: LISTEN_TO_USER_EVENTS,
		payload: events,
	};
}

export function listenToFollowers(followers) {
	return {
		type: LISTEN_TO_FOLLOWERS,
		payload: followers,
	};
}

export function listenToFollowing(following) {
	return {
		type: LISTEN_TO_FOLLOWING,
		payload: following,
	};
}

export function setFollowUser() {
	return {
		type: SET_FOLLOW_USER,
	};
}

export function setUnfollowUser() {
	return {
		type: SET_UNFOLLOW_USER,
	};
}

export function listenToFeed(feed) {
	return {
		type: LISTEN_TO_FEED,
		payload: feed,
	};
}