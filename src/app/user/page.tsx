"use client";
import { useAuthContext } from "../AuthContextProvider";
export default function User() {
  const user = useAuthContext();
  const userName = user?.split("@")[0];

  return <main>{user !== null ? <>Welcome {userName}</> : <>Welcome</>}</main>;
}
