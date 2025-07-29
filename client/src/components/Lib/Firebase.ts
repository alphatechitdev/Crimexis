import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const firebaseConfig2 = {
  apiKey: "AIzaSyBNUfRUhaE6uSU8VKEqLRnwqmVlCLZL5qk",
  authDomain: "crimexis-auth.firebaseapp.com",
  projectId: "crimexis-auth",
  storageBucket: "crimexis-auth.firebasestorage.app",
  messagingSenderId: "570115922127",
  appId: "1:570115922127:web:adc24962c42c0d97407fba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

