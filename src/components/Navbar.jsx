import { Link } from "react-router";

const Navbar = () => {

  const handleLogout = () => {

    // token remove
    localStorage.removeItem("token");

    // redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="font-bold">
        Blog App
      </h1>

      <div className="flex gap-4">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/create-post">
          Create Post
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;
