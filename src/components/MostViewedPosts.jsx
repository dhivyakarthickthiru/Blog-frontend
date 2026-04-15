
import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

const MostViewedPosts = () => {

  const [posts,
    setPosts] =
    useState([]);

  useEffect(() => {

    const fetchPosts =
      async () => {

      try {

        const res =
          await API.get(
            "/posts/most-viewed"
          );

        console.log(
          "Most viewed:",
          res.data
        );

        // FIX HERE

        setPosts(
          res.data.posts || []
        );

      } catch (error) {

        console.log(
          "Most viewed error:",
          error
        );

      }

    };

    fetchPosts();

  }, []);

  return (

    <div className="mt-6">

      <h2 className="font-bold mb-3">

        Most Viewed Posts

      </h2>

      {posts.length === 0 ? (

        <p className="text-gray-500">

          No posts found

        </p>

      ) : (

        posts.map(
          (post) => (

            <div
              key={post._id}
              className="border p-2 mb-2 rounded"
            >

              {post.title}

              <span className="text-sm text-gray-500 ml-2">

                👁 {post.views}

              </span>

            </div>

          )
        )

      )}

    </div>

  );

};

export default MostViewedPosts;