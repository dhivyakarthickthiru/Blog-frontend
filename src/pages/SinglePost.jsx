import { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../services/api";

const SinglePost = () => {

  const { id } = useParams();

  const [post, setPost] =
    useState(null);

  useEffect(() => {

    const fetchPost =
      async () => {

        try {

          const res =
            await API.get(
              `/posts/${id}`
            );

          setPost(
            res.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchPost();

  }, [id]);

  if (!post)
    return <p>Loading...</p>;

  return (

    <div className="p-6 max-w-3xl mx-auto">

      {/* IMAGE */}

      {post.image && (

        <img
          src={`http://localhost:3001/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-80 object-cover mb-4 rounded"
        />

      )}

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-3">
        {post.title}
      </h1>

      {/* AUTHOR */}

      <p className="text-gray-500 mb-4">
        By {post.author?.name}
      </p>

      {/* CONTENT */}

      <div
        dangerouslySetInnerHTML={{
          __html: post.content
        }}
      />

    </div>

  );

};

export default SinglePost;
