import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";

/*
Router configuration
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/create-post",
    element: <CreatePost />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <div>

      <RouterProvider router={router} />

    </div>
  );
}

export default App;
