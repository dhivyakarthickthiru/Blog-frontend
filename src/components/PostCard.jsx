import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";

import AuthorSubscribeButton
  from "./AuthorSubscribeButton";

import API from "../services/api";

import {
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaLink
} from "react-icons/fa";

const PostCard = ({ post }) => {

  const navigate = useNavigate();

  // ======================
  // STATE
  // ======================

  const [likes, setLikes] =
    useState(post.likes?.length || 0);

  const [liked, setLiked] =
    useState(false);

  const [bookmarked,
    setBookmarked] =
    useState(false);

  const [showShare,
    setShowShare] =
    useState(false);

  const [shareCount,
    setShareCount] =
    useState(post.shares || 0);

  const postUrl =
    `${window.location.origin}/post/${post._id}`;

  // ======================
  // BOOKMARK STATUS
  // ======================

  useEffect(() => {

    setBookmarked(
      post.bookmarked || false
    );

  }, [post.bookmarked]);

  // ======================
  // FETCH LIKES
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

          console.log(error);

        }

      };

    fetchLikes();

  }, [post._id]);


  //unlike increase like

  useEffect(() => {

  const userId =
    localStorage.getItem(
      "userId"
    );

  if (
    post.likes?.includes(
      userId
    )
  ) {

    setLiked(true);

  } else {

    setLiked(false);

  }

}, [post.likes]);



  // ======================
  // NAVIGATE
  // ======================

  const handleNavigate = () => {

    navigate(
      `/post/${post._id}`
    );

  };

  // ======================
  // LIKE
  // ======================

  const handleLike =
    async (e) => {

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
            `/posts/${post._id}/unlike`
          );

          setLiked(false);

          setLikes(
            (prev) =>
              prev - 1
          );

        } else {

          const res =
            await API.post(
              `/posts/${post._id}/like`
            );

          setLiked(true);

          setLikes(
            res.data.totalLikes
          );

        }

      } catch (error) {

        console.log(error);

      }

    };

  // ======================
  // SHARE
  // ======================

  const handleShare =
    async (platform) => {

      try {

        const res =
          await API.put(
            `/posts/${post._id}/share`
          );

        setShareCount(
          res.data.totalShares
        );

        let shareLink = "";

        if (platform === "whatsapp") {

          shareLink =
            `https://wa.me/?text=${postUrl}`;

        }

        if (platform === "facebook") {

          shareLink =
            `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;

        }

        if (platform === "linkedin") {

          shareLink =
            `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;

        }

        if (platform === "copy") {

          navigator.clipboard.writeText(
            postUrl
          );

          alert("Link copied");

          return;

        }

        window.open(
          shareLink,
          "_blank"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ======================
  // BOOKMARK
  // ======================

  const handleBookmark =
    async (e) => {

      e.stopPropagation();

      try {

        if (bookmarked) {

          await API.delete(
            `/posts/${post._id}/bookmark`
          );

          setBookmarked(false);

        } else {

          await API.post(
            `/posts/${post._id}/bookmark`
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
      className="
        relative
        border
        p-4
        rounded
        shadow
        bg-white
        cursor-pointer
        hover:shadow-lg
        transition
      "
      onClick={handleNavigate}
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

        By

        <Link
          to={`/authors/${post.author?._id}`}
          className="text-blue-600 hover:underline ml-1"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          {post.author?.name}

        </Link>

      </div>

      {/* AUTHOR SUBSCRIBE */}

      <div className="flex justify-between items-center mt-2">

        <span>

          By {post.author?.name}

        </span>

        <AuthorSubscribeButton
          authorId={
            post.author?._id
          }
        />

      </div>

      {/* ICONS */}

      <div
        className="
          flex
          justify-between
          items-center
          mt-4
          text-gray-600
        "
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

  {liked
    ? "👎 Unlike"
    : "👍 Like"}

  ({likes})

</button>
        {/* COMMENTS */}

        <span>

          💬 {post.commentsCount || 0}

        </span>

        {/* BOOKMARK */}

        <span
          onClick={handleBookmark}
          className={`cursor-pointer ${
            bookmarked
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >

          🔖

        </span>

        {/* SHARE */}

        <div className="relative">

          <span
            onClick={(e) => {

              e.stopPropagation();

              setShowShare(
                !showShare
              );

            }}
            className="
              cursor-pointer
              hover:text-blue-600
            "
          >

            ↗ Share ({shareCount})

          </span>

          {showShare && (

            <div
              className="
                absolute
                right-0
                bg-white
                border
                p-2
                rounded
                shadow
                mt-2
                flex
                gap-4
                text-2xl
                z-50
              "
            >

              <button
                onClick={() =>
                  handleShare(
                    "whatsapp"
                  )
                }
                className="
                  text-green-500
                  hover:scale-110
                  transition
                "
              >

                <FaWhatsapp />

              </button>

              <button
                onClick={() =>
                  handleShare(
                    "facebook"
                  )
                }
                className="
                  text-blue-600
                  hover:scale-110
                  transition
                "
              >

                <FaFacebook />

              </button>

              <button
                onClick={() =>
                  handleShare(
                    "linkedin"
                  )
                }
                className="
                  text-blue-800
                  hover:scale-110
                  transition
                "
              >

                <FaLinkedin />

              </button>

              <button
                onClick={() =>
                  handleShare(
                    "copy"
                  )
                }
                className="
                  text-gray-600
                  hover:scale-110
                  transition
                "
              >

                <FaLink />

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default PostCard;










