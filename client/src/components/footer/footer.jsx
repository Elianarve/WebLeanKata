import './Footer.css'; 
import svgImage from '../../assets/img/footer.svg';

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={svgImage} alt="SVG Image" />
    </div>
  );
}

export default Footer;
