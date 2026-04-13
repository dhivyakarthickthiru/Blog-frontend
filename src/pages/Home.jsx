import { useEffect, useState } from "react";
import API from "../services/api";

import PostCard from "../components/PostCard";
import HeroSection from "../components/HeroSection";
import SidebarPosts from "../components/SidebarPosts";

const Home = () => {

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

  // Latest post for hero

  const heroPost =
    posts[0];

  return (
    <div className="p-6">

      {/* HERO + SIDEBAR */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="md:col-span-2">

          <HeroSection
            post={heroPost}
          />

        </div>

        <div>

          <SidebarPosts
            posts={posts}
          />

        </div>

      </div>

      {/* POSTS GRID */}

      <h1 className="text-2xl font-bold mb-4">
        Latest Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {
          posts.map(
            (post) => (

              <PostCard
                key={post._id}
                post={post}
              />

            )
          )
        }

      </div>

    </div>
  );

};

export default Home;
