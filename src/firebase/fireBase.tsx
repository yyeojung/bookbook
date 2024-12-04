import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_MESSAGING_ID,
  appId: process.env.REACT_APP_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// export const auth = getAuth(app);

// export const db = getFirestore(app);

// export const realtimeDb = getDatabase(app);

// export const storage = getStorage(app);
