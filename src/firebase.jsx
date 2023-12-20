import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "todo-app-2d197",
  storageBucket: "todo-app-2d197.appspot.com",
  messagingSenderId: "562038816084",
  appId: "1:562038816084:web:4b7d5b411315cd0fae1cc1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;
