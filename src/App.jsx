import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import SinglePost from "./pages/SinglePost";


/*
Router configuration
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
  path: "/post/:id",
  element: <SinglePost />
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
    element: (
      <ProtectedRoute>

        <Dashboard />

      </ProtectedRoute>
    ),
  },

  {
    path: "/create-post",
    element: (
      <ProtectedRoute>
    <CreatePost />
    </ProtectedRoute>
  ),
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
    <Profile />
    </ProtectedRoute>




  ),
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
