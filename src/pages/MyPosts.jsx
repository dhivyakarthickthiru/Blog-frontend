import {
  useEffect,
  useState
} from "react";

import API from "../services/api";
import Layout from "../components/Layout";
import { Link } from "react-router";

const MyPosts = () => {

  const [posts,
    setPosts] =
    useState([]);

  const token =
    localStorage.getItem(
      "token"
    );

  const fetchPosts =
    async () => {

      const res =
        await API.get(
          "/posts/my-posts",
           {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
        );

      setPosts(
        res.data
      );

    };

  useEffect(() => {

    fetchPosts();

  }, []);

  const handleDelete =
    async (id) => {

      try {

        await API.delete(

          `/posts/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Post deleted"
        );

        fetchPosts();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <h1 className="text-xl font-bold mb-4">
        My Posts
      </h1>

      {posts.map(
        (post) => (

          <div
            key={post._id}
            className="border p-3 mb-3 rounded"
          >

            <h2 className="font-bold">
              {post.title}
            </h2>

            <div className="flex gap-2 mt-2">

              <Link
                to={`/edit-post/${post._id}`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(
                    post._id
                  )
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        )
      )}

    </Layout>

  );

};

export default MyPosts;