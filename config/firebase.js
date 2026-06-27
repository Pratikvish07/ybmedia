import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCP7iOyDwceDycRL6CXIrgm4L7bENDa4bM',
  authDomain: 'yb-productions.firebaseapp.com',
  databaseURL: 'https://yb-productions-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'yb-productions',
  storageBucket: 'yb-productions.firebasestorage.app',
  messagingSenderId: '412779165108',
  appId: '1:412779165108:android:3f08f6406cdd34d0db6ee1',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const realtimeDB = getDatabase(app);
export const storage = getStorage(app);

export default app;
