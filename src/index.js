import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import Loadable from 'react-loadable';
import Splash from './pages/Splash';
import './index.css';

import registerServiceWorker from './registerServiceWorker';


registerServiceWorker();

const App = Loadable({
  loader: () => import('./App'),
  loading: Splash,
});

const renderApp = (user) => {
  ReactDOM.render(
    <BrowserRouter>
      <App user={user} />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

const renderSplash = () => {
  ReactDOM.render(
    <Splash />,
    document.getElementById('root'),
  )
}

renderSplash();

const config = {
  apiKey: 'AIzaSyDoDRc6clLDFn6SQITBxlzIwXKotLIC480',
  authDomain: 'wimm-70965.firebaseapp.com',
  databaseURL: 'https://wimm-70965.firebaseio.com',
  projectId: 'wimm-70965',
  storageBucket: 'wimm-70965.appspot.com',
  messagingSenderId: '755630054891',
};

firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true,
})

firebase.firestore().enablePersistence().then(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      renderApp(user);
    } else {
      renderApp(null)
    }
  });
})




