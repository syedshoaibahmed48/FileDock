// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage" 

const firebaseConfig = {
  apiKey: process.env.Firebase_ApiKey,
  authDomain: process.env.Firebase_AuthDomain,
  projectId: process.env.Firebase_ProjectId,
  storageBucket: process.env.Firebase_StorageBucket,
  messagingSenderId: process.env.Firebase_MessagingSenderId,
  appId: process.env.Firebase_AppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);