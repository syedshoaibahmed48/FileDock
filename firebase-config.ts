// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage" 

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_Firebase_apiKey,
  authDomain: process.env.NEXT_PUBLIC_Firebase_authDomain,
  projectId: process.env.NEXT_PUBLIC_Firebase_projectId,
  storageBucket: process.env.NEXT_PUBLIC_Firebase_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_Firebase_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_Firebase_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);