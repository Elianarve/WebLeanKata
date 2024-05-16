import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Nav from "../nav/Nav";
import Footer from "../footer/footer";

const LayoutPrivate = () => {  //HE METIDO AQUI TB LA NAV Y EL FOOTER
  const { userAuth } = useUserContext();

  return (
    <>
      {userAuth ? (
        <>
          <Nav/>
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