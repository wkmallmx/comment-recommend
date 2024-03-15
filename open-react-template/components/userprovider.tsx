import { UserContext } from '@/context';
import React, {useState} from "react";

export default function UserProvider({children}: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    latitude: null,
    longitude: null,
    role: null,
    name: null,
    text: null,
    id: null,
  });


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}