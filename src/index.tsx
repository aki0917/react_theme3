import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// Firebaseの設定情報
const firebaseConfig = {
  apiKey: "AIzaSyAoCP4FGbKR3OW0iy3Avs2INA0rxWXCImI",
  authDomain: "tipmeapp-b8300.firebaseapp.com",
  projectId: "tipmeapp-b8300",
  storageBucket: "tipmeapp-b8300.appspot.com",
  messagingSenderId: "773308874449",
  appId: "1:773308874449:web:9db3fac5bb82475a188ff0",
  measurementId: "G-XGBE5RPVNY"
};

// Firebaseの初期化
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

