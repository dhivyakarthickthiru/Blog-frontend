import { useState } from "react";
import API from "../services/api";

const AuthorSubscribeButton = ({
  authorId
}) => {

  const [subscribed,
    setSubscribed] =
    useState(false);

  const handleToggle = async (e) => {

  e.stopPropagation();   // prevent card click
  e.preventDefault();

  try {

    if (subscribed) {

      await API.delete(
        `/author-subscriptions/${authorId}`
      );

      setSubscribed(false);

    } else {

      await API.post(
        `/author-subscriptions/${authorId}`
      );

      setSubscribed(true);

    }

  } catch (error) {

    console.log(error);

  }

};
  return (

    <button
      onClick={(e) => handleToggle(e)}
      
      className={
        subscribed
          ? "bg-gray-500 text-white px-2 py-1 rounded text-sm"
          : "bg-green-600 text-white px-2 py-1 rounded text-sm"
      }
    >

      {subscribed
        ? "Unsubscribe Author"
        : "Subscribe Author"}

    </button>

  );

};

export default AuthorSubscribeButton;