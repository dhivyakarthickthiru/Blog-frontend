import { useState, useEffect } from "react";
import API from "../services/api";

import {
  useEditor,
  EditorContent
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

const CreatePost = () => {

  // Title state
  const [title, setTitle] =
    useState("");

  // Category list from database
  const [categories, setCategories] =
    useState([]);

  // Selected category
  const [category, setCategory] =
    useState("");

   //image upload
   const [image, setImage] =
  useState(null); 

  // TipTap editor
  const editor =
    useEditor({
      extensions: [
        StarterKit
      ],
      content: ""
    });

  // Fetch categories when page loads

  useEffect(() => {

    const fetchCategories =
      async () => {

      try {

        const res =
          await API.get(
            "/categories"
          );

        setCategories(
          res.data
        );

      } catch (error) {

        console.log(
          "Category fetch error:",
          error
        );

      }

    };

    fetchCategories();

  }, []);

  // Submit post

    const handleSubmit =
  async (e, status) => {

  e.preventDefault();

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const content =
      editor.getHTML();

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

    formData.append(
      "category",
      category
    );

    // NEW

    formData.append(
      "status",
      status
    );

    if (image) {

      formData.append(
        "image",
        image
      );

    }

    await API.post(
      "/posts",
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert(
      status === "draft"
        ? "Draft saved successfully"
        : "Post published successfully"
    );

    // CLEAR

    setTitle("");
    setCategory("");
    setImage(null);

    editor.commands.setContent(
      ""
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error creating post"
    );

  }

};

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">
        Create Post
      </h1>

      <form onSubmit={handleSubmit}>

        {/* Title */}


        <input
  type="file"
  onChange={(e) =>
    setImage(
      e.target.files[0]
    )
  }
/>

        <input
          type="text"
          placeholder="Post Title"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        {/* Category Dropdown */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full border p-2 mb-4 rounded"
        >

          <option value="">
            Select Category
          </option>

          {
            categories.map(
              (cat) => (
                <option
                  key={
                    cat._id
                  }
                  value={
                    cat._id
                  }
                >
                  {
                    cat.name
                  }
                </option>
              )
            )
          }

        </select>

        {/* Rich Text Editor */}

        <div className="border p-3 rounded mb-4">

          <EditorContent
            editor={editor}
          />

        </div>

        {/* Submit Button */}

        <div className="flex gap-3">

  {/* SAVE DRAFT */}

  <button
    type="button"
    onClick={(e) =>
      handleSubmit(
        e,
        "draft"
      )
    }
    className="bg-gray-500 text-white px-4 py-2 rounded"
  >
    Save Draft
  </button>

  {/* PUBLISH */}

  <button
    type="button"
    onClick={(e) =>
      handleSubmit(
        e,
        "published"
      )
    }
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Publish Post
  </button>

</div>

      </form>

    </div>
  );

};

export default CreatePost;
