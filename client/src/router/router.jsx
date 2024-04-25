import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import GalleryNews from '../pages/GalleryNews'
import AddNews from '../pages/AddNews'
import News from '../pages/News'
import Register from '../pages/Register'
import LayoutPublic from '../layout/LayoutPublic'
import UpdateNews from '../pages/UpdateNews'
import LayoutPrivate from "../layout/LayoutPrivate";
import { getNews } from "../services/newsServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/news",
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <GalleryNews />,
            loader: getNews
          },
          {
            path: "/news/add",
            element: <AddNews />,
          },
          {
            path: "/news/:id",
            element: <News />,
          },
          {
            path: "/news/:id/update",
            element: <UpdateNews />,
          }
        ]
      }
    ]
  }
]);

export default router;

