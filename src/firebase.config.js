import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0l_mJgQpfidi7_aWAKGgGfjv18ESUirQ",
  authDomain: "house-marketplace-app-3c9b4.firebaseapp.com",
  projectId: "house-marketplace-app-3c9b4",
  storageBucket: "house-marketplace-app-3c9b4.appspot.com",
  messagingSenderId: "743396973426",
  appId: "1:743396973426:web:8037b27f663ada0e261beb",
};

// we pass firebaseConfig to initlize app

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
