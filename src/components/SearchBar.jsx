import React, { useState } from "react";

const SearchBar = ({
  posts,
  setFilteredPosts
}) => {

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {

    const value = e.target.value;

    setKeyword(value);

    const filtered = posts.filter((post) =>

      post.title
        .toLowerCase()
        .includes(value.toLowerCase())

      ||

      post.category
        .toLowerCase()
        .includes(value.toLowerCase())

      ||

      post.tags
        .join(" ")
        .toLowerCase()
        .includes(value.toLowerCase())

      ||

      post.author?.name
        ?.toLowerCase()
        .includes(value.toLowerCase())

    );

    setFilteredPosts(filtered);

  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      margin: "20px"
    }}>

      <input
        type="text"
        placeholder="Search by title, tag, category, author..."
        value={keyword}
        onChange={handleSearch}
        style={{
          width: "400px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray"
        }}
      />

    </div>
  );

};

export default SearchBar;