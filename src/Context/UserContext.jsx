import { createContext, useState } from "react";

// Create the context
export const userContext = createContext({});

// Provide the context to the app
export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null); // Initialize userInfo as null

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}
