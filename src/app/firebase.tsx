import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2qU4i8rpZkKAFpFY5XTTaFZm3JQXCicM",
    authDomain: "devot-880a1.firebaseapp.com",
    projectId: "devot-880a1",
    storageBucket: "devot-880a1.appspot.com",
    messagingSenderId: "533246614574",
    appId: "1:533246614574:web:c76d3d0405fcddb7e0d3bf"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const logout = async () => {
    const user = auth.currentUser;
    if (user) {
        try {
            await auth.signOut();
            console.log("User logged out");
        } catch (error: any) {
            console.error("Error logging out:", error.message);
        }
    } else {
        console.log("No user is currently signed in");
    }
};

export { app, db, auth, logout }