import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from '../layout/LayoutPublic'
// import LayoutPrivate from '';

import Register from "../pages/Register/Register";
import Home from '../pages/Home';
import Login from "../pages/login";
// import Dashboard from '';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPublic />,
        children: [
            {
                index: true,
                element: <Home />
            },
            { 
                path: "/login", 
                element: <Login /> 
            },
            { 
                path: "/register",
                element: <Register /> 
            },
        ],
    }
    // {
    //     path: "/chatbot/id_user",
    //     element: <LayoutPrivate />,
    //     children: [
    //         { 
    //             path: "chatbot/:id_user",
    //             element: <Dashboard /> 
    //         },
    //         { path: "settings/id_user",
    //           element: <Settings /> 
    //         },
    //     ],
    // },
])

export default router

