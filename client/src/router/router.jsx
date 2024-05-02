import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout";
import Home from "../pages/home/Home";
import Edit from "../components/edit/Edit";
import Card from "../components/card/Card";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import TargetState from "../components/forms/TargetState";
import Obstacle from "../components/forms/Obstacle";

export const router = createBrowserRouter([
  {
      path: "/",
      element: <LayoutPublic />,
      children: [
    {
      index: true,
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
      path: "/targetstate",
      element: <TargetState/>,
    },
    {
      path: "/obstacle",
      element: <Obstacle/>,
    },
    {
      path: "/Edit/:id",
      element: <Edit/>
    },
    {
      path: "/card/:id",
      element: <Card/>
    },
  ],
  }
  ]);

export default router;