import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../services/api";

import { useNavigate } from "react-router";

const DraftPage = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    fetchDrafts();
  }, []);

 
  const fetchDrafts = async () => {
  try {

    const res = await API.get("/posts/drafts");

    console.log("DRAFT DATA:", res.data);

    setDrafts(res.data);

  } catch (error) {

    console.log(error);

    setDrafts([]);

  }
};


const handlePublish = async (id) => {

  try {

    await API.put(
      `/posts/${id}/publish`
    );

    alert("Post published");

    // Refresh draft list

    fetchDrafts();

  } catch (error) {

    console.log(error);

  }

};

const navigate = useNavigate();

  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  {!drafts || drafts.length === 0 ? (

    <p>No draft posts found</p>

  ) : (

    drafts.map((post) => (

      

      <div
        key={post._id}
        className="border p-4 rounded shadow bg-white"
      >

        

        <h3 className="font-bold">
          {post.title}
        </h3>

        <p
          dangerouslySetInnerHTML={{
            __html: post.content?.slice(0, 100)
          }}
        />

        <p className="text-sm text-gray-500">

          Status: {post.status}

        </p>


 <button
  onClick={() =>
    handlePublish(post._id)
  }
  className="
    bg-green-500
    text-white
    px-3
    py-1
    rounded
    mt-2
  "
>
  Publish
</button>


<button
  onClick={() =>
    navigate(`/edit-post/${post._id}`)
  }
  className="
    bg-blue-500
    text-white
    px-3
    py-1
    rounded
    mt-2
    ml-2
  "
>
  Edit
</button>
       


      </div>

       

    ))

    

  )}

</div>
  );
};

export default DraftPage;