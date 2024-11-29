import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-O-qid4haYWVzzTyz7w0Ed1aDXQ1vZU",
  authDomain: "app-form-44ccc.firebaseapp.com",
  databaseURL: "https://app-form-44ccc-default-rtdb.firebaseio.com",
  projectId: "app-form-44ccc",
  storageBucket: "app-form-44ccc.firebasestorage.app",
  messagingSenderId: "98295065088",
  appId: "1:98295065088:web:5dea7abbef84b02fc846e5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
