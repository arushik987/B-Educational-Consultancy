// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZXH17hU0Iez2tIWuCBejd4bXzmb_YJdk",
  authDomain: "beducational-ef1ec.firebaseapp.com",
  databaseURL: "https://beducational-ef1ec-default-rtdb.firebaseio.com",
  projectId: "beducational-ef1ec",
  storageBucket: "beducational-ef1ec.firebasestorage.app",
  messagingSenderId: "439425155235",
  appId: "1:439425155235:web:72b5907fbe67d98572ff16"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
