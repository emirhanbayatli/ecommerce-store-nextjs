"use client";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type User = string | null;

export const AuthContex = createContext<User>(null);
const AuthDispatchContext = createContext<Dispatch<SetStateAction<User>>>(
  () => {},
);

export const AuthContexProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <AuthContex.Provider value={user}>
      <AuthDispatchContext.Provider value={setUser}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContex.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContex);
export const useAuthDispatchContext = () => useContext(AuthDispatchContext);
