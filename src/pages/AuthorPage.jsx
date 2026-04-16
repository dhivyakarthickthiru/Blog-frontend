import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import API from "../services/api";
import Layout from "../components/Layout";

const AuthorPage = () => {

  const { id } = useParams();

  const [author, setAuthor] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAuthor();
  }, [id]);

  const fetchAuthor = async () => {
    try {

      const res =
        await API.get(
          `/auth/authors/${id}`
        );

      setAuthor(
        res.data.author
      );

      setPosts(
        res.data.posts
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <Layout>

      {/* AUTHOR HEADER */}

      <div className="bg-white p-6 rounded shadow mb-6 flex items-center gap-4">

        <img
          src={`http://localhost:3001${author.profilePicture}`}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <div>

          <h2 className="text-2xl font-bold">
            {author.name}
          </h2>

          <p className="text-gray-600">
            {author.bio || "No bio yet"}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Total Posts:
            {" "}
            {posts.length}
          </p>

        </div>

      </div>

      {/* POSTS SECTION */}

      <h3 className="text-xl font-bold mb-4">
        Posts by {author.name}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {posts.map((post) => (

          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="border p-4 rounded shadow hover:shadow-lg bg-white"
          >

            <h4 className="font-bold text-lg">
              {post.title}
            </h4>

            <p className="text-gray-600 mt-2">

              {post.content
                ?.replace(/<[^>]+>/g, "")
                .slice(0, 100)}

              ...

            </p>

          </Link>

        ))}

      </div>

    </Layout>

  );

};

export default AuthorPage;