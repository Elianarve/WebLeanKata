import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Nav from "../nav/Nav";
import Footer from "../footer/footer";

const LayoutPrivate = () => {  
  const { userAuth } = useUserContext();

  return (
    <>
      {userAuth ? (
        <>
          <Nav />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      ) : ( 
        <Navigate to="/" />
      )}
    </>
  );
};

export default LayoutPrivate;