"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth, db } from "@/utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type User = { email: string; id: string } | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  resetPassword: async () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const saveUserToLocal = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getUserFromFirestore = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return null;
  };

  const saveUserToFirestore = async (user: FirebaseUser) => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role: "user",
      createdAt: new Date().toISOString(),
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const currentUser = { email: firebaseUser.email!, id: firebaseUser.uid };
      setUser(currentUser);
      saveUserToLocal(currentUser);
      toast.success("Login successful!");
      const userData = await getUserFromFirestore(firebaseUser.uid);
      if (userData?.role === "admin") router.push("/admin");
      else router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error("Login failed!");
      setUser(null);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const newUser = { email: firebaseUser.email!, id: firebaseUser.uid };
      setUser(newUser);
      saveUserToLocal(newUser);
      await saveUserToFirestore(firebaseUser);
      toast.success("Registration successful!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error("Registration failed!");
      setUser(null);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent!");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to send reset email.");
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
    toast.success("Logged out!");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
