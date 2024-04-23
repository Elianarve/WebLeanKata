import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";
import LayoutPrivate from "../layout/LayoutPrivate";
import Login from "../pages/Login";


export default createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        children: [
            { 
                path: "login", 
                element: <Login /> 
            },
            { 
                path: "register",
                element: <Register /> 
            },
        ],
    },
    {
        path: "/chatbot/id_user",
        element: <LayoutPrivate />,
        children: [
            { 
                path: "chatbot/:id_user",
                element: <Dashboard /> 
            },
            { path: "settings/id_user",
              element: <Settings /> 
            },
        ],
    },
]);

