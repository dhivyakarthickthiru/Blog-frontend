import { useState, useEffect } from "react";
import API from "../services/api";

import {
  useEditor,
  EditorContent
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

const CreatePost = () => {

  // =========================
  // STATES
  // =========================

  const [title, setTitle] =
    useState("");

  const [categories,
    setCategories] =
    useState([]);

  const [category,
    setCategory] =
    useState("");

  const [tags,
    setTags] =
    useState([]);

  const [selectedTags,
    setSelectedTags] =
    useState([]);

  const [image,
    setImage] =
    useState(null);

  // =========================
  // EDITOR
  // =========================

  const editor =
    useEditor({
      extensions: [
        StarterKit
      ],
      content: ""
    });

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {

    fetchCategories();

    fetchTags();

  }, []);

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

  const fetchTags =
    async () => {

    try {

      const res =
        await API.get(
          "/tags"
        );

      setTags(
        res.data
      );

    } catch (error) {

      console.log(
        "Tag fetch error:",
        error
      );

    }

  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit =
    async (
      e,
      status
    ) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const content =
        editor.getHTML();

      // VALIDATION

      if (
        !title ||
        !content
      ) {

        alert(
          "Title and content required"
        );

        return;

      }

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

      formData.append(
        "status",
        status
      );

      // TAGS

      selectedTags.forEach(
        (tagId) => {

          formData.append(
            "tags",
            tagId
          );

        }
      );

      // IMAGE

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

      // RESET

      setTitle("");
      setCategory("");
      setSelectedTags([]);
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

  // =========================
  // UI
  // =========================

  return (

    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">

        Create Post

      </h1>

      <form>

        {/* IMAGE */}

        <input
          type="file"
          className="mb-4"
          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        {/* TITLE */}

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

        {/* CATEGORY */}

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

          {categories.map(
            (cat) => (

              <option
                key={cat._id}
                value={cat._id}
              >

                {cat.name}

              </option>

            )
          )}

        </select>

        {/* TAGS */}

        <select
          multiple
          value={selectedTags}
          onChange={(e) => {

            const values =
              Array.from(
                e.target.selectedOptions,
                (option) =>
                  option.value
              );

            setSelectedTags(
              values
            );

          }}
          className="w-full border p-2 mb-4 rounded"
        >

          {tags.map(
            (tag) => (

              <option
                key={tag._id}
                value={tag._id}
              >

                {tag.name}

              </option>

            )
          )}

        </select>


        <div className="flex gap-2 mb-2">

  <button
    onClick={() =>
      editor.chain().focus().toggleBold().run()
    }
  >
    Bold
  </button>

  <button
    onClick={() =>
      editor.chain().focus().toggleItalic().run()
    }
  >
    Italic
  </button>

  <button
    onClick={() =>
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    }
  >
    H1
  </button>

  <button
    onClick={() =>
      editor.chain().focus().toggleBulletList().run()
    }
  >
    Bullet List
  </button>

</div>

        {/* EDITOR */}

        <div className="border p-3 rounded mb-4">

          <EditorContent
            editor={editor}
          />

        </div>

        {/* BUTTONS */}

        <div className="flex gap-3">

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