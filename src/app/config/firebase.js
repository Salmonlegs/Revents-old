import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAbMot46tD5iqlG3V2Rj4aAlkRdQeRmoDM',
	authDomain: 'revents-firebase-8e288.firebaseapp.com',
	databaseURL: 'https://revents-firebase-8e288.firebaseio.com',
	projectId: 'revents-firebase-8e288',
	storageBucket: 'revents-firebase-8e288.appspot.com',
	messagingSenderId: '497867951336',
	appId: '1:497867951336:web:85fbb6ea80a26f3efa0d5d',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
