import {
  useEffect,
  useState
} from "react";

import API from "../services/api";
import Layout from "../components/Layout";

const ManageTags = () => {

  const [tags,
    setTags] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const [editId,
    setEditId] =
    useState(null);

  const token =
    localStorage.getItem(
      "token"
    );

  // =========================
  // FETCH TAGS
  // =========================

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
          error
        );

      }

    };

  useEffect(() => {

    fetchTags();

  }, []);

  // =========================
  // ADD / UPDATE TAG
  // =========================

  const handleSave =
    async () => {

      try {

        if (!name) {

          alert(
            "Tag name required"
          );

          return;

        }

        if (editId) {

          // UPDATE

          await API.put(

            `/tags/${editId}`,

            { name },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

          alert(
            "Tag updated"
          );

        } else {

          // CREATE

          await API.post(

            "/tags",

            { name },

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

          alert(
            "Tag added"
          );

        }

        setName("");

        setEditId(null);

        fetchTags();

      } catch (error) {

        console.log(
          error
        );

      }

    };

  // =========================
  // DELETE
  // =========================

  const handleDelete =
    async (id) => {

      try {

        await API.delete(

          `/tags/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Tag deleted"
        );

        fetchTags();

      } catch (error) {

        console.log(
          error
        );

      }

    };

  // =========================
  // UI
  // =========================

  return (

    <Layout>

      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">

          Manage Tags

        </h1>

        {/* INPUT */}

        <div className="flex gap-3 mb-6">

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Enter tag name"
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >

            {editId
              ? "Update"
              : "Add"}

          </button>

        </div>

        {/* TAG LIST */}

        <div className="space-y-3">

          {tags.map(
            (tag) => (

              <div
                key={tag._id}
                className="flex justify-between items-center border p-3 rounded shadow-sm bg-white"
              >

                {/* NAME */}

                <span className="font-medium">

                  {tag.name}

                </span>

                {/* BUTTONS */}

                <div className="flex gap-2">

                  <button
                    onClick={() => {

                      setName(
                        tag.name
                      );

                      setEditId(
                        tag._id
                      );

                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        tag._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >

                    Delete

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </Layout>

  );

};

export default ManageTags;