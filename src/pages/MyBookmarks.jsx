import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import PostCard from "../components/PostCard";

const MyBookmarks = () => {

  const [posts,
    setPosts] =
    useState([]);

  useEffect(() => {

    const fetchBookmarks =
      async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(

          "/posts/my/bookmarks",

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

    fetchBookmarks();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">

        My Bookmarks

      </h1>

      {posts.map(
        (post) => (

          <PostCard
            key={post._id}
            post={post}
          />

        )
      )}

    </div>

  );

};

export default MyBookmarks;