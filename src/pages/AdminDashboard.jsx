import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {

  const [posts, setPosts] =
    useState([]);

  const [mostViewed,
    setMostViewed] =
    useState([]);

  const [users, setUsers] =
  useState([]);  

  useEffect(() => {

    fetchPosts();

    fetchMostViewed();

     fetchUsers();

  }, []);

  const fetchPosts =
    async () => {

    const res =
      await API.get(
        "/admin/posts"
      );

    setPosts(res.data);

  };

  const fetchMostViewed =
    async () => {

    const res =
      await API.get(
        "/admin/most-viewed"
      );

    setMostViewed(res.data);

  };

  const fetchUsers =
  async () => {

  const res =
    await API.get(
      "/admin/users"
    );

  setUsers(res.data);

};

  const handleDelete =
    async (id) => {

    await API.delete(
      `/admin/post/${id}`
    );

    alert("Post deleted");

    fetchPosts();

  };


  const handleDeleteUser =
  async (id) => {

  if (
    !window.confirm(
      "Delete this user?"
    )
  )
    return;

  await API.delete(
    `/admin/user/${id}`
  );

  alert("User deleted");

  fetchUsers();

};

  return (

    <div className="p-6">

      {/* TITLE */}

      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      {/* MOST VIEWED */}

      <h2 className="text-xl font-bold mb-3">
        Most Viewed Posts
      </h2>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
        mb-6
      ">

        {mostViewed.map(
          (post) => (

          <div
            key={post._id}
            className="
              border
              p-3
              rounded
              shadow
            "
          >

            <h3 className="font-bold">
              {post.title}
            </h3>

            <p>
              Views:
              {post.views}
            </p>

          </div>

        ))}

      </div>

      {/* ALL POSTS */}

      <h2 className="text-xl font-bold mb-3">
        All Posts
      </h2>


      <div className="grid grid-cols-3 gap-4 mb-6">

  <div className="bg-blue-500 text-white p-4 rounded">
    Total Posts
    <h2>
      {posts.length}
    </h2>
  </div>

  <div className="bg-green-500 text-white p-4 rounded">
    Most Viewed
    <h2>
      {mostViewed[0]?.views}
    </h2>
  </div>

  <div className="bg-orange-500 text-white p-4 rounded">
    Active Posts
    <h2>
      {posts.length}
    </h2>
  </div>

</div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
      ">

        {posts.map(
          (post) => (

          <div
            key={post._id}
            className="
              border
              p-4
              rounded
              shadow
              bg-white
            "
          >

            <h3 className="font-bold">
              {post.title}
            </h3>

            <p>
              Author:
              {post.author?.name}
            </p>

            <p>
              Views:
              {post.views}
            </p>

            <button
              onClick={() =>
                handleDelete(
                  post._id
                )
              }
              className="
                bg-red-500
                text-white
                px-3
                py-1
                rounded
                mt-2
              "
            >
              Delete Post
            </button>

          </div>

        ))}

      </div>

       {/* ============================ */}
    {/* HERE ADD ALL USERS SECTION */}
    {/* ============================ */}

    <h2 className="text-xl font-bold mt-6 mb-3">
      All Users
    </h2>

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-4
      "
    >

      {users.map((user) => (

        <div
          key={user._id}
          className="
            border
            p-4
            rounded
            shadow
            bg-white
          "
        >

          <h3 className="font-bold">
            {user.name}
          </h3>

          <p>
            {user.email}
          </p>

          <p>
            Role:
            {user.role}
          </p>

          <button
            onClick={() =>
              handleDeleteUser(
                user._id
              )
            }
            className="
              bg-red-500
              text-white
              px-3
              py-1
              rounded
              mt-2
            "
          >
            Delete User
          </button>

        </div>

      ))}

    </div>

    </div>

  );

};

export default AdminDashboard;