import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../services/api";

const ChangePassword = () => {

  const navigate = useNavigate();

  const [oldPassword,
    setOldPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      await API.put(
        "/auth/change-password",
        {
          oldPassword,
          newPassword
        }
      );

      alert(
        "Password changed successfully"
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);

      alert(
        "Password change failed"
      );

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(
                e.target.value
              )
            }
            className="w-full p-2 border rounded mb-4"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-500
              text-white
              p-2
              rounded
            "
          >
            Update Password
          </button>

        </form>

      </div>

    </div>

  );

};

export default ChangePassword;