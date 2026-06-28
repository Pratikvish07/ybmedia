import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCP7iOyDwceDycRL6CXIrgm4L7bENDa4bM',
  authDomain: 'yb-productions.firebaseapp.com',
  databaseURL: 'https://yb-productions-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'yb-productions',
  storageBucket: 'yb-productions.firebasestorage.app',
  messagingSenderId: '412779165108',
  appId: '1:412779165108:android:3f08f6406cdd34d0db6ee1',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  const { getAuth } = require('firebase/auth');
  auth = getAuth(app);
}

export { auth };
export const firestore = getFirestore(app);
export const realtimeDB = getDatabase(app);
export const storage = getStorage(app);

export default app;