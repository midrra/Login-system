import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AdminPage() {
  const [adminName, setAdminName] = useState();
  //we should call admin route here to secure the admin
  // and also i have to add requireRole in backend in every post request to ensure security
  useEffect(() => {
    const adminFetch = async () => {
      try {
        const res = await api.get("/home/dashboard");
        setAdminName(res.data.user.email);
      } catch (error) {
        console.error("something went wrong");
      }
    };
    adminFetch();
  }, []);
  return (
    <div className="bg-red-500 text-white font-bold text-2xl font-serif flex items-center justify-center min-h-screen">
      <div>
        <p className="mb-5"> Admin Page</p>
        <p>Admin: {adminName}</p>
      </div>
    </div>
  );
}

export default AdminPage;
