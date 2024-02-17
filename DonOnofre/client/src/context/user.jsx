import { createContext, useState } from "react";

const userInitialState = JSON.parse(window.localStorage.getItem('user')) || null;

export const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export function UserProvider({children}) {
  const [user, setUser] = useState(userInitialState)

  return(
    <UserContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}