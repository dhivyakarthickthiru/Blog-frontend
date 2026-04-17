import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../services/api";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      await API.put(
        `/auth/reset-password/${token}`,
        { password }
      );

      alert(
        "Password reset successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        "Reset failed"
      );

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen">

      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-2 border rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>

  );

};

export default ResetPassword;