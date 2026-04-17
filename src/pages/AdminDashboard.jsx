import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({});

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats =
    async () => {

    try {

      const res =
        await API.get(
          "/admin/dashboard"
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold">

        Admin Dashboard

      </h1>

      <p>

        {stats.message}

      </p>

    </div>

  );

};

export default AdminDashboard;