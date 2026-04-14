import {
  useEffect,
  useState
} from "react";

import API from "../services/api";
import Layout from "../components/Layout";

const ManageCategories = () => {

  const [categories,
    setCategories] =
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
  // FETCH CATEGORIES
  // =========================

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
          "Fetch error:",
          error
        );

      }

    };

  useEffect(() => {

    fetchCategories();

  }, []);

  // =========================
  // CREATE CATEGORY
  // =========================

  const handleCreate =
    async () => {

      try {

        if (!name) {

          alert(
            "Category name required"
          );

          return;

        }

        await API.post(

          "/categories",

          { name },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Category added successfully"
        );

        setName("");

        fetchCategories();

      } catch (error) {

        console.log(
          "Create error:",
          error
        );

        alert(
          "Error adding category"
        );

      }

    };

  // =========================
  // UPDATE CATEGORY
  // =========================

  const handleEdit =
    async () => {

      try {

        if (!name) {

          alert(
            "Category name required"
          );

          return;

        }

        await API.put(

          `/categories/${editId}`,

          { name },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Category updated"
        );

        setName("");

        setEditId(null);

        fetchCategories();

      } catch (error) {

        console.log(
          "Update error:",
          error
        );

      }

    };

  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDelete =
    async (id) => {

      try {

        await API.delete(

          `/categories/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        alert(
          "Category deleted"
        );

        fetchCategories();

      } catch (error) {

        console.log(
          "Delete error:",
          error
        );

      }

    };

  return (

    <Layout>

      <h1 className="text-xl font-bold mb-4">
        Manage Categories
      </h1>

      {/* INPUT + BUTTON */}

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="border p-2 rounded"
          placeholder="Category name"
        />

        <button
          type="button"
          onClick={
            editId
              ? handleEdit
              : handleCreate
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {
            editId
              ? "Update"
              : "Add"
          }
        </button>

      </div>

      {/* CATEGORY LIST */}

      {categories.map(
        (cat) => (

          <div
            key={cat._id}
            className="flex justify-between items-center border p-2 mb-2 rounded"
          >

            {cat.name}

            <div className="flex gap-2">

              {/* EDIT */}

              <button
                onClick={() => {

                  setName(
                    cat.name
                  );

                  setEditId(
                    cat._id
                  );

                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              {/* DELETE */}

              <button
                onClick={() =>
                  handleDelete(
                    cat._id
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

    </Layout>

  );

};

export default ManageCategories;