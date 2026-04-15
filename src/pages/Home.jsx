import { useEffect, useState } from "react";
import API from "../services/api";

import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import SidebarPosts from "../components/SidebarPosts";
import PostCard from "../components/PostCard";
import MostViewedPosts from "../components/MostViewedPosts";

const Home = () => {

  // POSTS STATE

  const [posts, setPosts] =
    useState([]);

  // CATEGORY STATE

  const [selectedCategory,
    setSelectedCategory] =
    useState("");

  // FETCH POSTS

  useEffect(() => {

    const fetchPosts =
      async () => {

        try {

          let url =
            "/posts";

          // If category selected

          if (selectedCategory) {

            url =
              `/posts?category=${selectedCategory}`;

          }

          const res =
            await API.get(url);

          setPosts(
            res.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchPosts();

  }, [selectedCategory]);

  // UI

  return (

    <Layout>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}

        <div className="md:col-span-2">

          {/* HERO */}

          <HeroSection posts={posts} />


          {/* TITLE */}

          <h2 className="text-xl font-bold mt-6 mb-4">

            Latest Posts

          </h2>

          {/* POSTS */}

          <div className="grid md:grid-cols-2 gap-4">

            {posts.length === 0 ? (

              <p>No posts found</p>

            ) : (

              posts.map((post) => (

                <PostCard
                  key={post._id}
                  post={post}
                />

              ))

              

            )}

          </div>

         

        </div>
        <div>

        {/* RIGHT SIDEBAR */}

        <SidebarPosts posts={posts} />


         <MostViewedPosts />
        </div>
      </div>

    </Layout>

  );

};

export default Home;