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

  const [notifications,
  setNotifications] =
  useState([]);

const [unreadCount,
  setUnreadCount] =
  useState(0);

 const [showNotifications,
  setShowNotifications] =
  useState(false); 

  useEffect(() => {

  const fetchNotifications = async () => {

  try {

    const res =
      await API.get(
        "/notifications/my"
      );

    console.log(
      "Notifications response:",
      res.data
    );

    // Ensure array

    if (Array.isArray(res.data)) {

      setNotifications(res.data);

      const unread =
        res.data.filter(
          (n) => !n.isRead
        ).length;

      setUnreadCount(unread);

    }

    else if (
      Array.isArray(
        res.data.notifications
      )
    ) {

      setNotifications(
        res.data.notifications
      );

      const unread =
        res.data.notifications.filter(
          (n) => !n.isRead
        ).length;

      setUnreadCount(unread);

    }

    else {

      setNotifications([]);

    }

  } catch (error) {

    console.log(error);

  }

};
  

  fetchNotifications();

  // refresh every 10 seconds

  const interval =
    setInterval(
      fetchNotifications,
      10000
    );

  return () =>
    clearInterval(interval);

}, []);

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



<div className="relative">

  {/* Bell Icon */}

  <button
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
    className="text-xl"
  >
    🔔
  </button>

  {/* Notification Dropdown */}

  {
    showNotifications && (

      <div
        className="
          absolute
          right-0
          mt-2
          w-64
          bg-white
          border
          rounded
          shadow-lg
          z-50
        "
      >

        {
          notifications.length === 0 ? (

            <p className="p-3 text-sm">

              No notifications

            </p>

          ) : (

            notifications.map((n) => (

              <div
                key={n._id}
                onClick={() =>
                  navigate(
                    `/post/${n.post._id}`
                  )
                }
                className="
                  p-2
                  border-b
                  cursor-pointer
                  hover:bg-gray-100
                "
              >

                {n.message}

              </div>

            ))

          )

        }

      </div>

    )

  }

</div>


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