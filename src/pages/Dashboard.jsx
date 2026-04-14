import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

const Dashboard = () => {

  const [posts, setPosts] =
    useState([]);

  useEffect(() => {

    const fetchPosts =
      async () => {

        try {

          const res =
            await API.get(
              "/posts"
            );

          setPosts(
            res.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchPosts();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {posts.map(
          (post) => (

            <PostCard
              key={post._id}
              post={post}
            />

          )
        )}

      </div>

    </div>

  );

};

export default Dashboard;
