import { useUserContext } from '../../context/UserContext'; 
import "../nav/Nav.css";
import './LogOut.css';
import profile from '../../assets/img/profile.png';


const LogOut = () => {
  const { setUser, setUserAuth } = useUserContext(); 

  const deleteDataUser = () => {
    setUser(null);
    setUserAuth(null);
    localStorage.removeItem('authToken');
}

  return (
    <button className="Btn" onClick={deleteDataUser}>
  <img className="icon-profile" src={profile}/>
  
  <div className="sign">

      </div>
  
  <div className="text">Cerrar sesión</div>

</button>
  )
}

export default LogOut;