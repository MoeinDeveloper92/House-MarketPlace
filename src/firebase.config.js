// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD9OArLpUawfAccbmHsobhRe-xDgvbQGtM",
  authDomain: "house-market-app-e02fc.firebaseapp.com",
  projectId: "house-market-app-e02fc",
  storageBucket: "house-market-app-e02fc.appspot.com",
  messagingSenderId: "750879269946",
  appId: "1:750879269946:web:e6af9ab94be6dd3e73c103",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
