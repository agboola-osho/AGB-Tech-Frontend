import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB1kX25oN3lg4c9kMmBvm2CF8Q05l3d1OE",
  authDomain: "agb-tech.firebaseapp.com",
  projectId: "agb-tech",
  storageBucket: "agb-tech.appspot.com",
  messagingSenderId: "409902871506",
  appId: "1:409902871506:web:3034e4789b8d0b60c48e0b",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
