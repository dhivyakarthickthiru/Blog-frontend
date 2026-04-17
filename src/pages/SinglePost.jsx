import {
  useEffect,
  useState
} from "react";

import {
  useParams,useNavigate
} from "react-router";



import API from "../services/api";




const SinglePost = () => {

  const { id } =
    useParams();

  
  const navigate =
    useNavigate();  

  const [post,
    setPost] =
    useState(null);

  const [comments,
    setComments] =
    useState([]);

  const [content,
    setContent] =
    useState("");

  const [replyId,
    setReplyId] =
    useState(null);

  // FETCH POST

  useEffect(() => {

    const fetchPost =
      async () => {

        const res =
          await API.get(
            `/posts/${id}`
          );

        setPost(
          res.data
        );

      };

    fetchPost();

    fetchComments();

  }, [id]);

  // FETCH COMMENTS

  const fetchComments =
    async () => {

    const res =
      await API.get(

        `/comments/post/${id}`

      );

    setComments(
      res.data
    );

  };

  // ADD COMMENT / REPLY

  const handleComment =
    async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    await API.post(

      "/comments",

      {
        content,
        post: id,
        parentComment:
          replyId
      },

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    );

    setContent("");

    setReplyId(null);

    fetchComments();

  };

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

      <p className="text-gray-500 mb-4">

        By {post.author?.name}

      </p>

      <div
        dangerouslySetInnerHTML={{
          __html:
            post.content
        }}
      />

      <button
  onClick={() =>
    navigate(
      `/post/${post._id}/analytics`
    )
  }
  className="bg-purple-600 text-white px-4 py-2 rounded mt-4"
>

  View Analytics

</button>

      {/* COMMENTS */}

      <h2 className="text-xl font-bold mt-6">

        Comments

      </h2>

      {/* REPLY MESSAGE */}

      {replyId && (

        <p className="text-sm text-gray-500">

          Replying to comment...

        </p>

      )}

      {/* INPUT */}

      <textarea
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        className="border w-full p-2 rounded mt-2"
        placeholder="Write comment..."
      />

      <button
        onClick={handleComment}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >

        Add Comment

      </button>

      {/* COMMENT LIST */}

      <div className="mt-6">

        {comments
          .filter(
            (comment) =>
              !comment.parentComment
          )
          .map(
            (comment) => (

              <div
                key={comment._id}
                className="border p-3 rounded mt-3"
              >

                <p className="font-bold">

                  {comment.user?.name}

                </p>

                <p>

                  {comment.text}

                </p>

                {/* REPLY BUTTON */}

                <button
                  onClick={() =>
                    setReplyId(
                      comment._id
                    )
                  }
                  className="text-blue-600 text-sm mt-2"
                >
                  Reply
                </button>

                {/* REPLIES */}

                {comments
                  .filter(
                    (reply) =>
                      reply.parentComment &&
                      reply.parentComment.toString() ===
                      comment._id.toString()
                  )
                  .map(
                    (reply) => (

                      <div
                        key={reply._id}
                        className="ml-6 border-l pl-3 mt-2"
                      >

                        <p className="font-bold">

                          {reply.user?.name}

                        </p>

                        <p>

                          {reply.text}

                        </p>

                      </div>

                    )
                  )}

              </div>

            )
          )}

      </div>

    </div>

  );

};

export default SinglePost;