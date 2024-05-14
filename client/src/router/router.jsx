import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout/LayoutPublic";
import Home from "../pages/home/Home";
import Card from "../components/card/Card";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import Process from '../components/forms/Process';
import Tribe from '../components/forms/Tribe';
import NotFound from "../pages/notfound/NotFound";


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
      path: "/process",
      element: <Process/>
    },
    {
      path: "/tribe",
      element: <Tribe/>
    },
    {
      path: "/challenge",
      element: <Challenge/>,
    },
    {
      path: "/actualstate",
      element: <ActualState/>,
    },
    {
      path: "/card/:id",
      element: <Card/>
    },
    {
      path: "*",
      element: <NotFound/>
    }
  ],
  }
  ]);

export default router;