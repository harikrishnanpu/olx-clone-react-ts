import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '../hooks/hooks';
import { setUser } from '../store/slices/authSlice';
import { loadCartFromFirestore } from '../store/slices/cartSlice';
import { auth } from '../config/firebase.config';

export const AuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
      if(user){
        dispatch(loadCartFromFirestore(user.uid));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

