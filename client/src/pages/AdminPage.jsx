import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [adminName, setAdminName] = useState();
  const navigate = useNavigate()
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

  const clickHandler = async () => {
    try {
      const res = await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 bg-red-500 text-white ">
      <Button
        variant="outline"
        onClick={clickHandler}
        className="cursor-pointer"
      >
        Logout
      </Button>
      <div className="font-bold text-2xl font-serif flex items-center justify-center min-h-screen">
        <div>
          <p className="mb-5"> Admin Page</p>
          <p>Admin: {adminName}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
