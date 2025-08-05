"use client";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type User = string | null;

export const AuthContext = createContext<User>(null);
const AuthDispatchContext = createContext<Dispatch<SetStateAction<User>>>(
  () => {},
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser.slice(1));
    }
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={setUser}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);
