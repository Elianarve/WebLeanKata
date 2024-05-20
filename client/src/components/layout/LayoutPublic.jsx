import { Outlet } from "react-router-dom";
import Nav from "../nav/Nav";
import Footer from "../footer/footer";

const LayoutPublic = () => { 
    return ( 
        <div>
            <Nav/>
                <Outlet />
            <Footer/>
        </div>
    );
};
export default LayoutPublic;