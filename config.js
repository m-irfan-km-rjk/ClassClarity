import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuxjAsQ6t-kQ5-zeZCjmspPtnNsWssjIM",
  authDomain: "mandrake-86624.firebaseapp.com",
  projectId: "mandrake-86624",
  storageBucket: "mandrake-86624.appspot.com",
  messagingSenderId: "571666797439",
  appId: "1:571666797439:web:fe2e0cf6360eeb3066404a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {app, auth, firestore};