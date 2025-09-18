import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsacou7qze5ExwqdmrRlR4dMHcspWmYGE",
  authDomain: "online-store-b12f4.firebaseapp.com",
  projectId: "online-store-b12f4",
  storageBucket: "online-store-b12f4.appspot.com", 
  messagingSenderId: "788644907274",
  appId: "1:788644907274:web:4926c12fd2d9f88baa92f3",
  measurementId: "G-HFCH8WCEET"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
