import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth } from "firebase/auth";
import {initializeApp} from "firebase/app";


const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyBFuTHbzNEezPYoBzWVPodDaAxZf4XGnVU",
  authDomain: "todo-list-2022-1eed4.firebaseapp.com",
  databaseURL: "https://todo-list-2022-1eed4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-list-2022-1eed4",
  storageBucket: "todo-list-2022-1eed4.appspot.com",
  messagingSenderId: "102048192747",
  appId: "1:102048192747:web:bb2184a4ecaaa660d886ae"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

