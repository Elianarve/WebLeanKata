import { createContext, useContext, useState } from "react"; 

export const UserContext = createContext(); 

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