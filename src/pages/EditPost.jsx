import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";

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

const editor =
  useEditor({

    extensions: [
      StarterKit,
      Underline
    ],

    content: content || ""

  });


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

        if (editor) {
  editor.commands.setContent(
    res.data.content
  );
}

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

        
        const html =
  editor.getHTML();

formData.append(
  "content",
  html
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


   const handlePublish =
  async () => {

  try {

    const formData =
      new FormData();

    formData.append(
      "title",
      title
    );

   const html =
  editor.getHTML();

formData.append(
  "content",
  html
);
    // முக்கியமான line

    formData.append(
      "status",
      "published"
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
      "Post published successfully"
    );

    // redirect home

    navigate("/home");

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

      
      <div className="border p-2 mb-3">

  {/* Toolbar */}

  <div className="flex gap-2 mb-2">

    <button
      type="button"
      onClick={() =>
        editor.chain().focus().toggleBold().run()
      }
    >
      Bold
    </button>

    <button
      type="button"
      onClick={() =>
        editor.chain().focus().toggleItalic().run()
      }
    >
      Italic
    </button>

    <button
      type="button"
      onClick={() =>
        editor.chain().focus().toggleUnderline().run()
      }
    >
      Underline
    </button>

    <button
      type="button"
      onClick={() =>
        editor.chain().focus().toggleBulletList().run()
      }
    >
      Bullet List
    </button>

  </div>

  {/* Editor */}

  <EditorContent
    editor={editor}
    className="border p-2 min-h-[150px]"
  />

</div>

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


      <button
    onClick={handlePublish}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Publish
  </button>



    </Layout>

  );

};

export default EditPost;