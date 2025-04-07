import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration for walabothome-app-cloud
const firebaseConfig = {
    apiKey: "AIzaSyAKfI6AXqkRQ5JkNjm9bXBLzYc4rLhsKBw",
    authDomain: "walabothome-app-cloud.firebaseapp.com",
    projectId: "walabothome-app-cloud",
    storageBucket: "walabothome-app-cloud.appspot.com",
    messagingSenderId: "431037494856",
    appId: "1:431037494856:web:4f8a9b96271e61c8b0693a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
