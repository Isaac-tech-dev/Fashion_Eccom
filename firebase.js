// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_v67ug1Ff9zGpvt29Arcolz3gnIBX_ek",
  authDomain: "fashionecommerce-4eeec.firebaseapp.com",
  projectId: "fashionecommerce-4eeec",
  storageBucket: "fashionecommerce-4eeec.appspot.com",
  messagingSenderId: "988417096125",
  appId: "1:988417096125:web:5f4a896c43a7f18738fad4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
