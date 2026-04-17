import { useState, useEffect } from "react";
import API from "../services/api";

const CategorySubscribeButton = ({ categoryId }) => {

  const [subscribed, setSubscribed] =
    useState(false);

  // Check if already subscribed
   useEffect(() => {

  const checkSubscription =
    async () => {

    try {

      const res =
        await API.get(
          "/category-subscriptions/my"
        );

      console.log(
        "My subscriptions:",
        res.data
      );

      const ids =
        res.data.categories.map(
          (cat) => cat._id
        );

      if (
        ids.includes(categoryId)
      ) {

        setSubscribed(true);

      } else {

        setSubscribed(false);

      }

    } catch (error) {

      console.log(
        "Subscription check error:",
        error
      );

    }

  };

  checkSubscription();

}, [categoryId]);
 
  // Toggle subscribe

const handleToggle = async () => {

  try {

    console.log("Button clicked", categoryId);

    if (subscribed) {

      const res = await API.delete(
        `/category-subscriptions/${categoryId}`
      );

      console.log("Unsubscribed:", res.data);

      setSubscribed(false);

    } else {

      const res = await API.post(
        `/category-subscriptions/${categoryId}`
      );

      console.log("Subscribed:", res.data);

      setSubscribed(true);

    }

  } catch (error) {

    console.log(
      "Subscription error:",
      error.response?.data || error.message
    );

  }

};

  return (

    <button
      onClick={handleToggle}
      className={
        subscribed
          ? "bg-gray-500 text-white px-3 py-1 rounded"
          : "bg-blue-600 text-white px-3 py-1 rounded"
      }
    >

      {subscribed
        ? "Unsubscribe"
        : "Subscribe"}

    </button>

  );

};

export default CategorySubscribeButton;