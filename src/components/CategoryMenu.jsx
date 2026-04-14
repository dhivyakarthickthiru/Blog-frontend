import { useEffect, useState } from "react";
import API from "../services/api";

const CategoryMenu = ({ setSelectedCategory }) => {

  const [categories,
    setCategories] =
    useState([]);

  useEffect(() => {

    const fetchCategories =
      async () => {

        try {

          const res =
            await API.get(
              "/categories"
            );

          console.log(
            "Categories:",
            res.data
          );

          setCategories(
            res.data
          );

        } catch (error) {

          console.log(error);

        }

      };

    fetchCategories();

  }, []);

  return (

    <div className="min-w-[150px]">

      {/* ALL */}

      <button
        onClick={() =>
          setSelectedCategory("")
        }
        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
      >
        All
      </button>

      {/* CATEGORY LIST */}

      {categories.map(
        (cat) => (

          <button
            key={cat._id}
            onClick={() =>
              setSelectedCategory(cat._id)
            }
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
          >
            {cat.name}
          </button>

        )
      )}

    </div>

  );

};

export default CategoryMenu;