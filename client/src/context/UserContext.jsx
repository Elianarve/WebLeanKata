/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react"; // Importa las funciones necesarias de React

export const UserContext = createContext(); // Crea un contexto de usuario

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userAuth, setUserAuth] = useState(false);
  
    return (
      <UserContext.Provider value={{ userAuth, setUserAuth, user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  

export default UserProvider;


export const useUserContext = () => useContext(UserContext);