import {
  useNavigate
} from "react-router";

import {
  useState,
  useEffect
} from "react";

import API from "../services/api";

const PostCard = ({ post }) => {

  const navigate =
    useNavigate();

  // ======================
  // STATE
  // ======================

  const [likes,
    setLikes] =
    useState(
      post.likes?.length || 0
    );

  const [liked,
    setLiked] =
    useState(false);

  const [shares,
  setShares] =
  useState(
    post.shares || 0
  );  

  const [bookmarked,
  setBookmarked] =
  useState(false);

  // ======================
  // FETCH LIKES COUNT
  // ======================

  useEffect(() => {

    const fetchLikes =
      async () => {

      try {

        const res =
          await API.get(
            `/posts/${post._id}/likes`
          );

        setLikes(
          res.data.totalLikes
        );

      } catch (error) {

        console.log(
          "Fetch likes error:",
          error
        );

      }

    };

    fetchLikes();

  }, [post._id]);

  // ======================
  // NAVIGATE TO SINGLE POST
  // ======================

  const handleNavigate =
    () => {

      console.log(
        "Navigating to:",
        post._id
      );

      navigate(
        `/post/${post._id}`
      );

    };

  // ======================
  // LIKE / UNLIKE
  // ======================

  const handleLike = async (e) => {

  e.stopPropagation();

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      alert(
        "Please login first"
      );

      return;

    }

    if (liked) {

      await API.delete(
        `/posts/${post._id}/unlike`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setLiked(false);

      setLikes(
        (prev) =>
          prev - 1
      );

    } else {

      const res =
        await API.post(
          `/posts/${post._id}/like`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setLiked(true);

      setLikes(
        res.data.totalLikes
      );

    }

  } catch (error) {

    console.log(
      "Like error:",
      error.response?.data
    );

  }

};



const handleShare =
  async (e) => {

  e.stopPropagation();

  try {

    // Copy link

    const link =
      `${window.location.origin}/post/${post._id}`;

    await navigator.clipboard.writeText(
      link
    );

    alert(
      "Link copied!"
    );

    // Update share count

    const res =
      await API.put(
        `/posts/${post._id}/share`
      );

    setShares(
      res.data.totalShares
    );

  } catch (error) {

    console.log(error);

  }

};


const handleBookmark =
  async (e) => {

  e.stopPropagation();

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    if (bookmarked) {

      await API.delete(

        `/posts/${post._id}/bookmark`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setBookmarked(false);

    } else {

      await API.post(

        `/posts/${post._id}/bookmark`,

        {},

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setBookmarked(true);

    }

  } catch (error) {

    console.log(error);

  }

};
  // ======================
  // UI
  // ======================

  return (

    <div
      className="border p-4 rounded shadow bg-white cursor-pointer hover:shadow-lg transition"
      onClick={
        handleNavigate
      }
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

      <h2 className="text-lg font-bold hover:text-blue-600">

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

      {/* ICON SECTION */}

      <div
        className="flex justify-between items-center mt-4 text-gray-600"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* LIKE */}

        <button
          onClick={handleLike}
          className={
            liked
              ? "text-blue-600 font-bold"
              : "text-gray-600"
          }
        >

          👍 {likes}

        </button>

        {/* COMMENTS */}

        <span>

          💬 {post.commentsCount || 0}

        </span>

        {/* BOOKMARK */}

        
        <span
  onClick={handleBookmark}
  className={
    bookmarked
      ? "text-blue-600 cursor-pointer"
      : "cursor-pointer"
  }
>

  🔖

</span>

        {/* SHARE */}

        <span   onClick={handleShare}
        className="cursor-pointer  hover:text-blue-600">

          ↗ Share    ({shares})

        </span>

      </div>

    </div>

  );

};

export default PostCard;