import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP928FEUqVlmDkknOC3SY4Iui_rJep0Z8",
  authDomain: "fir-practice-cb110.firebaseapp.com",
  projectId: "fir-practice-cb110",
  storageBucket: "fir-practice-cb110.appspot.com",
  messagingSenderId: "529989179065",
  appId: "1:529989179065:web:c5b031a6f0e512b97f6d68",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const db = getFirestore(app);
