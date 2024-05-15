/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react"; // Importa las funciones necesarias de React

export const UserContext = createContext(); // Crea un contexto de usuario

const UserProvider = ({ children }) => { // Define el componente UserProvider que proporciona el contexto a sus componentes hijos
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [userAuth, setUserAuth] = useState(false); // Estado para indicar si el usuario está autenticado o no

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth, user, setUser }}> {/* Proporciona el valor del contexto a sus componentes hijos */}
      {children} {/* Renderiza los componentes hijos dentro del proveedor de contexto */}
    </UserContext.Provider>
  );
};


export default UserProvider;


export const useUserContext = () => useContext(UserContext);