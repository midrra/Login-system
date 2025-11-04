import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Alert from "../components/Alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


function Testing() {
  const [dataName, setDataName] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get("/home/em");
        setDataName({
          message: res.data.running,
          user: res.data.user.email,
          hello: res.data.user.firstName + " " + res.data.user.lastName,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchHome();
  }, []);

  const clickHandler = async () => {
    try {
      const res = await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      navigate("/login",{replace:true})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 bg-blue-500 text-white">
      <Button
        variant="outline"
        onClick={clickHandler}
        className="cursor-pointer"
      >
        Logout
      </Button>
      <div className=" font-bold text-2xl font-serif flex items-center justify-center min-h-screen">
        <div>
          <Alert />
          <p>Hello: {dataName.hello}</p>
          <p>user: {dataName.user}</p>
        </div>
      </div>
    </div>
  );
}

export default Testing;
