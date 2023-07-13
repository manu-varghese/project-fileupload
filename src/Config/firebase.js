

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDA-9Y4N-ZZwPg6rzlJHZuyELLMfxXAq8c",
    authDomain: "project-fileupload-8065a.firebaseapp.com",
    projectId: "project-fileupload-8065a",
    storageBucket: "project-fileupload-8065a.appspot.com",
    messagingSenderId: "1036674067808",
    appId: "1:1036674067808:web:b5a55b6ee8a77510680205"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

