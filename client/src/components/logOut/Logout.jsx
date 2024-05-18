import { useUserContext } from '../../context/UserContext'; 
import "../nav/Nav.css";

const Logout = () => {
  const { setUser, setUserAuth } = useUserContext(); 

  const deleteDataUser = () => {
    setUser(null);
    setUserAuth(null);
    localStorage.removeItem('authToken');
}

  return (
    <li className="nav-button" onClick={deleteDataUser}>Log Out</li>
  )
}

export default Logout;