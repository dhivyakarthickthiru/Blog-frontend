import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router";

import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const PostAnalytics = () => {

  const { id } =
    useParams();

  const [data,
    setData] =
    useState([]);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

      const res =
        await API.get(
          `/posts/${id}/analytics`
        );

      const analytics =
        res.data;

      setData([
        {
          name: "Views",
          value:
            analytics.views
        },
        {
          name: "Likes",
          value:
            analytics.likes
        },
        {
          name: "Comments",
          value:
            analytics.comments
        },
        {
          name: "Shares",
          value:
            analytics.shares
        }
      ]);

    };

    fetchAnalytics();

  }, [id]);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">

        Post Analytics

      </h1>

      <BarChart
        width={500}
        height={300}
        data={data}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="value" />

      </BarChart>

    </div>

  );

};

export default PostAnalytics;