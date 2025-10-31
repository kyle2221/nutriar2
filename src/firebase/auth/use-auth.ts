
'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useFirebase } from '../provider';
import { useUser } from './use-user';

export function useAuth() {
  const { auth, isFirebaseReady } = useFirebase();
  const { user, loading } = useUser();

  const signUp = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    if (!auth) throw new Error('Firebase Auth is not initialized');
    return firebaseSignOut(auth);
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    isFirebaseReady,
  };
}
