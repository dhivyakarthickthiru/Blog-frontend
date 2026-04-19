import React from "react";

import {createBrowserRouter,RouterProvider} from "react-router";


import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword
  from "./pages/ResetPassword";
import ChangePassword
  from "./pages/ChangePassword";  
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import SinglePost from "./pages/SinglePost";
import ManageCategories
  from "./pages/ManageCategories";
 import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost"; 
import ManageTags
  from "./pages/ManageTags";
import PostAnalytics from "./pages/PostAnalytics";  
import MyBookmarks from "./pages/MyBookmarks";

import AuthorPage from "./pages/AuthorPage";

import AdminDashboard
  from "./pages/AdminDashboard";
import DraftPage from "./pages/DraftPage";



/*
Router configuration
*/

const router = createBrowserRouter([

  {
    path: "/",
    element: <Login />,
  }, 

  {
  path: "/home",
  element: (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  )
},
  {
  path: "/post/:id",
  element: <SinglePost />
},


{
  path: "/drafts",
  element: (
    <ProtectedRoute>
      <DraftPage />
    </ProtectedRoute>
  )
},


{
  path: "/post/:id/analytics",
  element: <PostAnalytics />
},

{
  path: "/my-bookmarks",
  element: <MyBookmarks />
},

 

  {
     path:"/register",
     element:<Register />
  },
  {

    path:"/forgot-password",
    element:<ForgotPassword />

  },

  {

    path:"/reset-password/:token",
  element:<ResetPassword />

  },

  {
  path: "/change-password",
  element: <ChangePassword />
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
  path: "/admin",
  element: (
    <ProtectedRoute  adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  )
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
  path: "/my-posts",
  element: <MyPosts />
},
{
  path: "/edit-post/:id",
  element: <EditPost />
},

  {
  path: "/manage-categories",
  element:
    <ManageCategories />
},


{
  path: "/manage-tags",
  element: <ManageTags />
},

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
    <Profile />
    </ProtectedRoute>
),
},

{
  path: "/authors/:id",
  element: <AuthorPage />
}
]);

function App() {
  return (
    <div>

      <RouterProvider router={router} />

    </div>
  );
}

export default App;
