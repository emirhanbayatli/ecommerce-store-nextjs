"use client";
import { auth } from "@/utils/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { toast } from "sonner";

type User = { email: string | null; id: string | null } | null;
interface AuthContextType {
  user: User;
  loading: boolean;
  logout(): void;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});
const AuthDispatchContext = createContext<Dispatch<SetStateAction<User>>>(
  () => {},
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const currentUser = { email: firebaseUser.email, id: firebaseUser.uid };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    try {
      const auth = getAuth();
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      <AuthDispatchContext.Provider value={setUser}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);
