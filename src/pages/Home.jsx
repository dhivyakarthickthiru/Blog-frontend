import { useEffect, useState } from "react";
import API from "../services/api";

import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import SidebarPosts from "../components/SidebarPosts";
import PostCard from "../components/PostCard";
import MostViewedPosts from "../components/MostViewedPosts";

const Home = () => {

  // POSTS STATE

  const [posts, setPosts] = useState([]);

  const [filteredPosts,
    setFilteredPosts] =
    useState([]);

  // CATEGORY STATE

  const [selectedCategory,
    setSelectedCategory] =
    useState("");

  // FETCH POSTS

  const fetchPosts = async () => {

    try {

      let url = "/posts";

      if (selectedCategory) {

        url =
          `/posts?category=${selectedCategory}`;

      }

      const res =
        await API.get(url);

      setPosts(res.data);

      setFilteredPosts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // RUN WHEN CATEGORY CHANGES

  useEffect(() => {

    fetchPosts();

  }, [selectedCategory]);

  // UI

  return (

    <Layout>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}

        <div className="md:col-span-2">

          {/* HERO */}

          <HeroSection posts={filteredPosts} />

          {/* TITLE */}

          <h2 className="text-xl font-bold mt-6 mb-4">

            Latest Posts

          </h2>

          {/* POSTS */}

          <div className="grid md:grid-cols-2 gap-4">

            {filteredPosts.length === 0 ? (

              <p>No posts found</p>

            ) : (

              filteredPosts.map((post) => (

                <PostCard
                  key={post._id}
                  post={post}
                />

              ))

            )}

          </div>

        </div>

        {/* RIGHT SIDEBAR */}

        <div>

          <SidebarPosts

            posts={posts}

            setFilteredPosts={
              setFilteredPosts
            }

            setSelectedCategory={
              setSelectedCategory
            }

          />

          <MostViewedPosts />

        </div>

      </div>

    </Layout>

  );

};

export default Home;