import { useState, useEffect } from "react";
import API from "../services/api";
import CategoryMenu from "./CategoryMenu";

const SidebarPosts = ({
  posts,
  setFilteredPosts,
  setSelectedCategory
}) => {

  const [keyword, setKeyword] =
    useState("");

  const [mySubscriptions,
    setMySubscriptions] =
    useState([]);

  const handleSearch = (e) => {

    const value =
      e.target.value.toLowerCase();

    setKeyword(value);

    if (!value) {

      setFilteredPosts(posts);
      return;

    }

    const filtered =
      posts.filter((post) =>

        post.title
          ?.toLowerCase()
          .includes(value)

        ||

        post.content
          ?.toLowerCase()
          .includes(value)

        ||

        post.category?.name
          ?.toLowerCase()
          .includes(value)

        ||

        post.author?.name
          ?.toLowerCase()
          .includes(value)

      );

    setFilteredPosts(filtered);

  };

  useEffect(() => {

    const fetchSubscriptions =
      async () => {

      try {

        const res =
          await API.get(
            "/category-subscriptions/my"
          );

        const ids =
          res.data.categories.map(
            (cat) => cat._id
          );

        setMySubscriptions(ids);

      } catch (error) {

        console.log(error);

      }

    };

    fetchSubscriptions();

  }, []);

  return (

    <div className="bg-gray-100 p-4 rounded-lg">

      <h3 className="font-bold mb-3">
        Search
      </h3>

      <input
        type="text"
        placeholder="Search posts..."
        value={keyword}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-6"
      />

      <h3 className="font-bold mb-3">
        Categories
      </h3>

      <CategoryMenu
        setSelectedCategory={
          setSelectedCategory
        }
        mySubscriptions={
          mySubscriptions
        }
      />

      <h3 className="font-bold mt-6 mb-3">
        Recent Posts
      </h3>

      {
        posts
          .slice(0, 5)
          .map((post) => (

            <div
              key={post._id}
              className="mb-3 border-b pb-2"
            >

              <p className="font-medium">
                {post.title}
              </p>

              <span className="text-sm text-gray-500">
                {post.author?.name}
              </span>

            </div>

          ))
      }

    </div>

  );

};

export default SidebarPosts;