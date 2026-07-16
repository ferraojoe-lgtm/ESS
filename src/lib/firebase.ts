import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Safely load local firebase applet config if it exists (preventing build errors on GitHub where the file is ignored)
const configs = import.meta.glob("../../firebase-applet-config.json", { eager: true });
const configModule: any = Object.values(configs)[0];
const appletConfig = configModule?.default || configModule || {};

const env = (import.meta as any).env || {};

// Read from environment variables if present (with VITE_ prefix for client side),
// or fall back to the default generated firebase-applet-config.json, or use dummy safe fallbacks.
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || "dummy-api-key-for-github",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "dummy-project.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || "dummy-project-id",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "dummy-project.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "1234567890",
  appId: env.VITE_FIREBASE_APP_ID || appletConfig.appId || "1:1234567890:web:1234567890",
};

const databaseId = env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId || undefined;
const dbId = (databaseId && databaseId !== "default" && databaseId !== "undefined" && databaseId.trim() !== "") ? databaseId : undefined;

const app = initializeApp(firebaseConfig);
export const db = dbId ? getFirestore(app, dbId) : getFirestore(app);
export const auth = getAuth(app);
