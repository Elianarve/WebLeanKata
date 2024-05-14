import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout/LayoutPublic";
import Home from "../pages/home/Home";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import Tribe from '../components/forms/Tribe';
import Card from "../components/card/Card";
import NotFound from "../pages/notfound/NotFound";
import Process from "../components/forms/Process";

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
      path:"/card/:id",
      element: <Card/>
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