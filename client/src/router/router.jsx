import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout";
import Home from "../components/home/Home";
import NewItem from "../components/newitem/NewItem";
import Edit from "../components/edit/Edit";
import Card from "../components/card/Card";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <LayoutPublic />,
      children: [
    {
      path: "/",
      element: <Home/>,
    },

    {
      path: "/NewItem",
      element: <NewItem/>,
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