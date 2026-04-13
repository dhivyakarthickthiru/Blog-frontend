const SidebarPosts = ({ posts }) => {

  return (
    <div>

      <h3 className="font-bold mb-3">

        Recent Posts

      </h3>

      {
        posts.slice(0, 5).map(
          (post) => (

            <div
              key={post._id}
              className="mb-3 border-b pb-2"
            >

              <p className="font-medium">

                {post.title}

              </p>

              <span className="text-sm text-gray-500">

                {post.author?.name}

              </span>

            </div>

          )
        )
      }

    </div>
  );

};

export default SidebarPosts;
