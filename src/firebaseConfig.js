import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correctly import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdedB_jLp6o7cT0k8sAakKamuu4VqZFkU",
  authDomain: "ecolocobox.firebaseapp.com",
  projectId: "ecolocobox",
  storageBucket: "ecolocobox.appspot.com",
  messagingSenderId: "490868356934",
  appId: "1:490868356934:web:5e63912c1edfcd52455747",
  measurementId: "G-D1PLWY6561"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export default db;
