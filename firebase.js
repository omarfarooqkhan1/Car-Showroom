import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCzw1GCp7CBXdVh0TgKNuAXJvJ63Gy5Bkg',
  authDomain: 'car-showroom-mad.firebaseapp.com',
  projectId: 'car-showroom-mad',
  storageBucket: 'car-showroom-mad.appspot.com',
  messagingSenderId: '101082479339',
  appId: '1:101082479339:web:ec91e0f20f5851a0a0dcae',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
