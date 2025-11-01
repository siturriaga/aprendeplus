import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../lib/firebase';
import { toast } from 'react-hot-toast';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: ReturnType<typeof getAuth>;
  db: Firestore;
  user: ReturnType<typeof getAuth>['currentUser'];
  loading: boolean;
  signIn: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [app] = useState(() => initializeApp(firebaseConfig));
  const [auth] = useState(() => getAuth());
  const [db] = useState(() => getFirestore(app));
  const [user, setUser] = useState<ReturnType<typeof getAuth>['currentUser']>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {
      // fall back to default persistence silently
    });
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, [auth]);

  const value = useMemo<FirebaseContextValue>(
    () => ({
      app,
      auth,
      db,
      user,
      loading,
      signIn: async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error: any) {
          if (error.code === 'auth/popup-blocked') {
            await signInWithRedirect(auth, provider);
          } else if (error.code !== 'auth/cancelled-popup-request') {
            toast.error(error.message ?? 'Unable to sign in.');
          }
        }
      },
      signOutUser: async () => {
        await signOut(auth);
      }
    }),
    [app, auth, db, user, loading]
  );

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }
  return ctx;
}
