import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router";

import API from "../services/api";
import Layout from "../components/Layout";

const EditPost = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [title,
    setTitle] =
    useState("");

  const [content,
    setContent] =
    useState("");

  const [image,
    setImage] =
    useState(null);

  const token =
    localStorage.getItem(
      "token"
    );

  useEffect(() => {

    const fetchPost =
      async () => {

        const res =
          await API.get(
            `/posts/${id}`
          );

        setTitle(
          res.data.title
        );

        setContent(
          res.data.content
        );

      };

    fetchPost();

  }, [id]);

  const handleUpdate =
    async () => {

      try {

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "content",
          content
        );

        if (image) {

          formData.append(
            "image",
            image
          );

        }

        await API.put(

          `/posts/${id}`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Post updated"
        );

        navigate(
          "/my-posts"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <h1 className="text-xl font-bold mb-4">
        Edit Post
      </h1>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        className="border p-2 w-full mb-3"
      />

      <textarea
        value={content}
        onChange={(e) =>
          setContent(
            e.target.value
          )
        }
        className="border p-2 w-full mb-3"
      />

      <input
        type="file"
        onChange={(e) =>
          setImage(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 mt-3"
      >
        Update Post
      </button>

    </Layout>

  );

};

export default EditPost;