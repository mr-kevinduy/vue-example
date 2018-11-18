import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyC3XnnueUpvtNWgsSVwT3ioW0z2Xr2EOBw',
  authDomain: 'vuejs-sample-c4c20.firebaseapp.com',
  databaseURL: 'https://vuejs-sample-c4c20.firebaseio.com',
  projectId: 'vuejs-sample-c4c20',
  storageBucket: 'vuejs-sample-c4c20.appspot.com',
  messagingSenderId: '1001807010412'
};

const firebase = firebaseApp.initializeApp(config);
const settings = { timestampsInSnapshots: true };

firebaseApp.firestore().settings(settings);

export default firebase;
