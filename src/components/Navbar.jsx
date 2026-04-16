import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CategoryMenu from "./CategoryMenu";
import API from "../services/api";

const Navbar = () => {

  const navigate = useNavigate();

  // FIRST declare token

  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});

  // THEN useEffect

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await API.get(
            "/auth/profile"
        );
        console.log("PROFILE DATA:", res.data);

        setUser(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    if (token) {
      fetchProfile();
    }

  }, [token]);

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (
       <div className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 flex justify-between z-50">
      <h1 className="font-bold">
        Blog App
      </h1>


      


      <div className="flex gap-4 items-center">


        
          {user.profilePicture && (
    <img
      src={`http://localhost:3001${user.profilePicture}`}
      alt="profile"
      className="w-10 h-10 rounded-full border"
    />
  )}

        <Link to="/">
          Home
        </Link>


        {/* CATEGORY DROPDOWN */}

        <div className="relative group">

          <button>
            Categories ▼
          </button>

          <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow z-50">

            <CategoryMenu />

          </div>

        </div>

        {token ? (

          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/create-post">
              Create Post
            </Link>

             <Link to="/my-posts">
    My Posts
  </Link>
         <Link to="/profile">
  Profile
</Link>


             {/* NEW */}

  <Link to="/manage-categories">
    Manage Categories
  </Link>

  <Link to="/manage-tags">
  Manage Tags
</Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>

        ) : (

          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>

        )}

      </div>

    </div>

    
  );

};

export default Navbar;