import { createBrowserRouter } from "react-router-dom";

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

