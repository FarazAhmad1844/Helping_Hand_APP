// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClVv6pxg5Clkzob7jGYxdpAkn6IAxHrO8",
  authDomain: "helpinghands-70813.firebaseapp.com",
  projectId: "helpinghands-70813",
  storageBucket: "helpinghands-70813.appspot.com",
  messagingSenderId: "1070297023164",
  appId: "1:1070297023164:web:0eec378623e1b5112dc6b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=initializeFirestore(app,{
  experimentalForceLongPolling:true
});

