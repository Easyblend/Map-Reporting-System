import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP928FEUqVlmDkknOC3SY4Iui_rJep0Z8",
  authDomain: " process.env.REACT_APP_AUTHDOMAIN",
  projectId: "process.env.REACT_APP_PROJECTOD",
  storageBucket: "process.env.REACT_APP_STORAGEBUCKET",
  messagingSenderId: "process.env.REACT_APP_MESSAGESENDER",
  appId: " process.env.REACT_APP_APPID",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
