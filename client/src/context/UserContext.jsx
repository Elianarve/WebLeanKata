import { useContext, createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children}) => {
    const [ user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [id_user, setId_user] = useState(null);

    return (
        <UserContext.Provider value = {{ user, setUser, isAuthenticated, setIsAuthenticated, id_user, setId_user }}>{children}</UserContext.Provider>
    );
}

export default UserProvider;

export const useUser = () => {
    return useContext(UserContext);
}

