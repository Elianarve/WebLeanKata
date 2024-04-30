import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/Layout";
import Home from "../components/home/Home";
import Edit from "../components/edit/Edit";
import Card from "../components/card/Card";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import Obstacle from "../components/forms/obstacle";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <LayoutPublic />,
      children: [
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/obstacle",
      element: <Obstacle/>,
    },
    {
      path: "/reto",
      element: <Challenge/>,
    },
    {
      path: "/actualstate",
      element: <ActualState/>,
    },
    {
      path: "/Edit/:id",
      element: <Edit/>
    },
    {
      path: "/card/:id",
      element: <Card/>
    }
  ],
  }
  ]);

export default router;