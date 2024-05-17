import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout/LayoutPublic";
import LayoutPrivate from "../components/layout/LayoutPrivate";
import Home from "../pages/home/Home";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import Process from '../components/forms/Process';
import Tribe from '../components/forms/Tribe';
import NotFound from "../pages/notfound/NotFound";
import Card from "../components/card/Card";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RegisterForm from "../components/forms/RegisterForm"; 

export const router = createBrowserRouter([
  {
      path: "/",
      element: <LayoutPublic />,
      errorElement: <NotFound/>,
      children: [
        {
          index: true,
          element: <Landing/>,
      },{
        path: "register",
        element: <Register/>
      },
      {
        path: "RegisterForm", // Asegúrate de usar camelCase si deseas que coincida exactamente con la URL
        element: <RegisterForm/>,
      },
      
      {
          path: "login",
          element: <Login/>
      },
      {
        path: "/home",
        element: <LayoutPrivate/>,
        children: [
          {
            index: true,
            element: <Home/>,
          },
          {
            path:"card/:id",
            element: <Card/>
          },
          {
            path: "process",
            element: <Process/>
          },
          {
            path: "tribe",
            element: <Tribe/>
          },
          {
            path: "challenge",
            element: <Challenge/>,
          },
          {
            path: "actualstate",
            element: <ActualState/>,
          },
        ]
        ,}
    ]},
  ]);

export default router;