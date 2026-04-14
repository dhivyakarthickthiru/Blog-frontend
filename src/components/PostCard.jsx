import { useNavigate } from "react-router";

const PostCard = ({ post }) => {

  const navigate = useNavigate();

  return (

    <div
      onClick={() =>
        navigate(`/post/${post._id}`)
      }
      className="border p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
    >

      {/* IMAGE */}

      {post.image && (

        <img
          src={`http://localhost:3001/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover mb-3 rounded"
        />

      )}

      {/* TITLE */}

      <h2 className="text-lg font-bold">
        {post.title}
      </h2>

      {/* CONTENT */}

      <p className="text-gray-600 mt-2">

        {
          post.content
            ?.replace(/<[^>]+>/g, "")
            .slice(0, 100)
        }...

      </p>

      {/* AUTHOR */}

      <div className="mt-2 text-sm text-gray-500">

        By {post.author?.name}

      </div>

    </div>

  );

};

export default PostCard;