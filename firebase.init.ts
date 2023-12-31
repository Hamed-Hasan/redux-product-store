import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3f9eirrAW-RzGDUl-URIEaSeim_dkjcM",
    authDomain: "tech-net-36bcf.firebaseapp.com",
    projectId: "tech-net-36bcf",
    storageBucket: "tech-net-36bcf.appspot.com",
    messagingSenderId: "136681171794",
    appId: "1:136681171794:web:ce940e8ff3f2911059688b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default auth;
