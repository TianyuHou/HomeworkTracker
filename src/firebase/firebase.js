const firebase = require("firebase");
// const firebaseConfig = require("../../.firebaseConfig");

const config = {
  apiKey: process.env.FIREBASE_API_KEY || firebaseConfig.FIREBASE_API_KEY,
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN || firebaseConfig.FIREBASE_AUTH_DOMAIN,
  databaseURL:
    process.env.FIREBASE_DATABASE_URL || firebaseConfig.FIREBASE_DATABASE_URL,
  projectId:
    process.env.FIREBASE_PROJECT_ID || firebaseConfig.FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ||
    firebaseConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID ||
    firebaseConfig.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

module.exports = {
  firebase: firebase,
  database: database
};
