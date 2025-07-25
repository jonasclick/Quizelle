import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
// type fallback to avoid Vite named export error
type User = {
  uid: string;
};

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
        });
        console.log('DEBUG: AuthContext has set the user.');
      } else {
        setUser(null);
        console.log('DEBUG: AuthContex has set the user to null.');
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
