import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCvGCfhCZN9-5RsmsnMe4hz9Nt5-EJ9Q7U",
    authDomain: "job-portal-f820b.firebaseapp.com",
    projectId: "job-portal-f820b",
    storageBucket: "job-portal-f820b.appspot.com",
    messagingSenderId: "1075032479613",
    appId: "1:1075032479613:web:c9ea3551dc356fbfb79e14"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// packages needed to use firebase with firebase storage
// 1. firebase
// 2. @firebase/storage