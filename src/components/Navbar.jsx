import { Link, useNavigate } from "react-router";
import CategoryMenu from "./CategoryMenu";

const Navbar = () => {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="font-bold">
        Blog App
      </h1>

      <div className="flex gap-4 items-center">

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