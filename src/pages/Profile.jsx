
import { useState, useEffect } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";

const Profile = () => {

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

   

    const res = await API.get(
      "/auth/profile"
    );

    setName(res.data.name);
    setBio(res.data.bio);

    setFacebook(
      res.data.socialLinks?.facebook || ""
    );

    setTwitter(
      res.data.socialLinks?.twitter || ""
    );

    setLinkedin(
      res.data.socialLinks?.linkedin || ""
    );

    setInstagram(
      res.data.socialLinks?.instagram || ""
    );

  };

   const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    await API.put(
      "/auth/profile",
      {
        name,
        bio,
        socialLinks: {
          facebook,
          twitter,
          linkedin,
          instagram
        }
      }

      

    );

    alert("Profile updated");

  };

  return (

    <Layout>

      <h2 className="text-2xl font-bold mb-4">
        My Profile
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-2 mb-3 w-full"
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          className="border p-2 mb-3 w-full"
        />

        <input
          type="text"
          placeholder="Facebook link"
          value={facebook}
          onChange={(e) =>
            setFacebook(e.target.value)
          }
          className="border p-2 mb-3 w-full"
        />

        <input
          type="text"
          placeholder="Twitter link"
          value={twitter}
          onChange={(e) =>
            setTwitter(e.target.value)
          }
          className="border p-2 mb-3 w-full"
        />

        <input
          type="text"
          placeholder="LinkedIn link"
          value={linkedin}
          onChange={(e) =>
            setLinkedin(e.target.value)
          }
          className="border p-2 mb-3 w-full"
        />

        <input
          type="text"
          placeholder="Instagram link"
          value={instagram}
          onChange={(e) =>
            setInstagram(e.target.value)
          }
          className="border p-2 mb-3 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
        >
          Update Profile
        </button>

<button
  onClick={() =>
    navigate("/change-password")
  }
  type="button"
  className="
    bg-gray-600
    text-white
    px-4
    py-2
    rounded
    mt-4
    ml-2
  "
>
  Change Password
</button>


      </form>

    </Layout>

  );

};

export default Profile;