import './Footer.css'; 
import { useUserContext } from '../../context/UserContext'; 


const Footer = () => {
  const {userAuth } = useUserContext(); 

  return (
    <>
    { userAuth && (
    <div className="footer-container">
      <p className='transparentFooter'>Politica de privacidad | Terminos de uso</p>
      <p className='blueFooter'>© 2006 - 2021 Wix.com, Inc</p>
    </div>
  )}
  </>
  );
}

export default Footer;