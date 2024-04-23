import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

 export const LayoutPublic = () => {
    return (
        <>
        <Nav/>
        <Outlet />
        <Footer/>
        </>
    )
}