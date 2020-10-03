const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.addFollowing = functions.firestore
	.document('following/{userUid}/userFollowing/{profileId}')
	.onCreate(async (snapshot, context) => {
		const { userUid, profileId } = context.params;
		const following = snapshot.data();
		try {
			const userDoc = await db.collection('users').doc(userUid).get();
			const batch = db.batch();
			batch.set(
				db.collection('following').doc(profileId).collection('userFollowers').doc(userUid),
				{
					displayName: userDoc.data().displayName,
					photoURL: userDoc.data().photoURL,
					uid: userDoc.id,
				},
			);
			batch.update(db.collection('users').doc(profileId), {
				followerCount: admin.firestore.FieldValue.increment(1),
			});
			const res = await batch.commit();
			console.log('addFollowing res', res);
		} catch (error) {
			return console.log(error);
		}
		return console.log('finished');
	});

exports.removeFollowing = functions.firestore
	.document('following/{userUid}/userFollowing/{profileId}')
	.onDelete(async (snapshot, context) => {
		const { userUid, profileId } = context.params;
		const batch = db.batch();
		batch.delete(
			db.collection('following').doc(profileId).collection('userFollowers').doc(userUid),
		);
		batch.update(db.collection('users').doc(profileId), {
			followerCount: admin.firestore.FieldValue.increment(-1),
		});
		try {
			return await batch.commit();
		} catch (error) {
			return console.log(error);
		}
	});

exports.eventUpdated = functions.firestore
	.document('events/{eventId}')
	.onUpdate(async (snapshot, context) => {
		const after = snapshot.after.data();
		const before = snapshot.before.data();
		console.log('updated before data', before);
		console.log('updated after data', after);
		// attendee joining event
		if (before.attendees.length < after.attendees.length) {
			let attendeeJoined = after.attendees.filter(
				(attendee1) =>
					!before.attendees.some((attendee2) => {
						return attendee2.id === attendee1.id;
					}),
			)[0];
			console.log('attendeeJoined', attendeeJoined);
			console.log('attendeeJoined ID', attendeeJoined.id);
			try {
				const followerDocs = await db
					.collection('following')
					.doc(attendeeJoined.id)
					.collection('userFollowers')
					.get();
				console.log('getFollowerDoc', followerDocs);
				followerDocs.forEach((doc) => {
					admin
						.database()
						.ref(`/posts/${doc.id}`)
						.push(newPost(attendeeJoined, 'joined-event', context.params.eventId, before));
				});
			} catch {
				return console.log(error);
			}
		}

		// attendee leaving event

		if (before.attendees.length > after.attendees.length) {
			let attendeeLeft = before.attendees.filter(
				(attendee1) =>
					!after.attendees.some((attendee2) => {
						return attendee2.id === attendee1.id;
					}),
			)[0];
			console.log('attendeeJoined', attendeeLeft);
			try {
				const followerDocs = await db
					.collection('following')
					.doc(attendeeLeft.id)
					.collection('userFollowers')
					.get();
				followerDocs.forEach((doc) => {
					admin
						.database()
						.ref(`/posts/${doc.id}`)
						.push(newPost(attendeeLeft, 'left-event', context.params.eventId, before));
				});
			} catch {
				return console.log(error);
			}
		}
		return console.log('finished');
	});

function newPost(user, code, eventId, event) {
	return {
		photoURL: user.photoURL,
		date: admin.database.ServerValue.TIMESTAMP,
		code,
		displayName: user.displayName,
		eventId,
		userUid: user.id,
		title: event.title,
	};
}
