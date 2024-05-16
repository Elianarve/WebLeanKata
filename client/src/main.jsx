import React from 'react'
import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import UserProvider from "./context/UserContext";
import UserProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <UserProvider>
        <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
    </UserProvider>
  </React.StrictMode>,
);