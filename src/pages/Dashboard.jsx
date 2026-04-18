import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API from "../services/api";
import PostCard from "../components/PostCard";

const Dashboard = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  const [loading, setLoading] = useState(true);

  // FETCH PROFILE

  const fetchProfile = async () => {

    try {

      const res =
        await API.get(
          "/auth/profile"
        );

      setUser(res.data);

    } catch (error) {

      console.log(
        "Profile error:",
        error
      );

    }

  };

  // FETCH ALL POSTS

  const fetchPosts = async () => {

    try {

      const res =
        await API.get(
          "/posts"
        );

      setPosts(res.data);

    } catch (error) {

      console.log(
        "Posts error:",
        error
      );

    }

  };

  // FETCH MY POSTS

  const fetchMyPosts = async () => {

    try {

      const res =
        await API.get(
          "/posts/my"
        );

      setMyPosts(res.data);

      let likes = 0;

      res.data.forEach(
        (post) => {

          likes +=
            post.likes?.length || 0;

        }
      );

      setTotalLikes(likes);

    } catch (error) {

      console.log(
        "My Posts error:",
        error
      );

    }

  };

  // PAGE LOAD

  useEffect(() => {

    const loadData =
      async () => {

        setLoading(true);

        await fetchProfile();
        await fetchPosts();
        await fetchMyPosts();

        setLoading(false);

      };

    loadData();

  }, []);

  // LOADING STATE

  if (loading) {

    return (
      <p className="p-6">
        Loading dashboard...
      </p>
    );

  }

  return (

    <div className="p-6">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-4">
        Dashboard
      </h1>

      {/* WELCOME */}

      <h2 className="text-xl font-semibold mb-6">
        Welcome, {user.name}
      </h2>

      {/* ANALYTICS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* TOTAL POSTS */}

        <div className="bg-blue-500 text-white p-4 rounded shadow">

          <h3>
            Total Posts
          </h3>

          <p className="text-2xl font-bold">
            {posts.length}
          </p>

        </div>

        {/* MY POSTS */}

        <div className="bg-green-500 text-white p-4 rounded shadow">

          <h3>
            My Posts
          </h3>

          <p className="text-2xl font-bold">
            {myPosts.length}
          </p>

        </div>

        {/* TOTAL LIKES */}

        <div className="bg-orange-500 text-white p-4 rounded shadow">

          <h3>
            Total Likes
          </h3>

          <p className="text-2xl font-bold">
            {totalLikes}
          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() =>
            navigate(
              "/create-post"
            )
          }
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Create Post
        </button>

        <button
          onClick={() =>
            navigate(
              "/my-posts"
            )
          }
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          My Posts
        </button>

      </div>

      {/* POSTS GRID */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {posts.map((post) => (

          <PostCard
            key={post._id}
            post={post}
          />

        ))}

      </div>

    </div>

  );

};

export default Dashboard;