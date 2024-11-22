import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmxR_5KiB2bPHXpPvVz4W6FAaPB7anAyM",
  authDomain: "mtm6404-contact-book-rea-91d33.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-91d33",
  storageBucket: "mtm6404-contact-book-rea-91d33.firebasestorage.app",
  messagingSenderId: "1053314656603",
  appId: "1:1053314656603:web:0c243f05f8684e175c127e",
  measurementId: "G-S50KH6RJQ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
