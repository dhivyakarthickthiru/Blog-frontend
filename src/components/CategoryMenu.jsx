import { useEffect, useState } from "react";
import API from "../services/api";

import CategorySubscribeButton
  from "./CategorySubscribeButton";

const CategoryMenu = ({
  setSelectedCategory
}) => {

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

    <div className="min-w-[200px]">

      {/* ALL */}

      <button
        onClick={() =>
          setSelectedCategory("")
        }
        className="
          block
          w-full
          text-left
          px-4
          py-2
          hover:bg-gray-200
        "
      >
        All
      </button>

      {/* CATEGORY LIST */}

      {categories.map((cat) => (

        <div
          key={cat._id}
          className="
            flex
            justify-between
            items-center
            px-4
            py-2
            hover:bg-gray-200
          "
        >

          <span
            onClick={() =>
              setSelectedCategory(cat._id)
            }
            className="cursor-pointer"
          >
            {cat.name}
          </span>

          <CategorySubscribeButton
            categoryId={cat._id}
          />

        </div>

      ))}

    </div>

  );

};

export default CategoryMenu;