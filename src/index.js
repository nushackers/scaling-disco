import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Firebase App is always required and must be first
import * as firebase from 'firebase';

// Add additional services you want to use
import "firebase/auth";
// import "firebase/database";
// import "firebase/firestore";
// import "firebase/messaging";
// import "firebase/functions";
// import "firebase/storage";

const config = {
  apiKey: "AIzaSyByfXJU9SK5OQAbZfxCw1oUG4M1R1hS4hE",
  authDomain: "hack-n-roll.firebaseapp.com",
  databaseURL: "https://hack-n-roll.firebaseio.com",
  projectId: "hack-n-roll",
  storageBucket: "",
  messagingSenderId: "1000953651325"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
