import { useUserContext } from '../../context/UserContext'; 
import "../nav/Nav.css";
import './Logout.css'
import profile from '../../assets/img/profile.png';


const Logout = () => {
  const { setUser, setUserAuth } = useUserContext(); 

  const deleteDataUser = () => {
    setUser(null);
    setUserAuth(null);
    localStorage.removeItem('authToken');
}

  return (
    <button class="Btn" onClick={deleteDataUser}>
  <img className="icon-profile" src={profile}/>
  
  <div class="sign">

      </div>
  
  <div class="text">Cerrar sesión</div>

</button>
  )
}

export default Logout;