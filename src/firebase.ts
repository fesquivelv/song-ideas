import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; 


const firebaseConfig = {
  apiKey: "AIzaSyAc1wi_udYxAMKXn2zsPKGxmqsPsXmSHwk",
  authDomain: "song-ideas-f304b.firebaseapp.com",
  projectId: "song-ideas-f304b",
  storageBucket: "song-ideas-f304b.firebasestorage.app",
  messagingSenderId: "973801643807",
  appId: "1:973801643807:web:7d813954da50f54c0f1a2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);

export default app;