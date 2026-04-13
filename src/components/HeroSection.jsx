const HeroSection = ({ post }) => {

  if (!post) return null;

  return (
    <div className="bg-gray-100 p-6 rounded">

      <h2 className="text-2xl font-bold mb-2">

        {post.title}

      </h2>

      <p className="text-gray-600">

        {
          post.content
            ?.replace(/<[^>]+>/g, "")
            .slice(0, 150)
        }...

      </p>

      <div className="mt-2 text-sm text-gray-500">

        By {post.author?.name}

      </div>

    </div>
  );

};

export default HeroSection;
