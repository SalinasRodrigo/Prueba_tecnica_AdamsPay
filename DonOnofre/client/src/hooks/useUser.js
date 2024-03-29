import { useContext } from "react";
import { UserContext } from "../context/user";

export const useUser = () => {
  const context = useContext(UserContext)
  
  if(context === undefined){
    throw new Error('useUser necesita de UserProvider')
  }

  return context
} 