// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoCP4FGbKR3OW0iy3Avs2INA0rxWXCImI",
  authDomain: "tipmeapp-b8300.firebaseapp.com",
  projectId: "tipmeapp-b8300",
  storageBucket: "tipmeapp-b8300.appspot.com",
  messagingSenderId: "773308874449",
  appId: "1:773308874449:web:9db3fac5bb82475a188ff0",
  measurementId: "G-XGBE5RPVNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { app};
