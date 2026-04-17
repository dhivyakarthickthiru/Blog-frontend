import { useState } from "react";
import API from "../services/api";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/forgot-password",
        { email }
      );

      alert(
        "Reset link sent to email"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Error sending reset link"
      );

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
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
            Send Reset Link
          </button>

        </form>

      </div>

    </div>

  );

};

export default ForgotPassword;