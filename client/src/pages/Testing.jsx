import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import Alert from "../components/Alert";

function Testing() {
  const [dataName, setDataName] = useState({});

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get("/home/em");
        console.log(res.data)
        setDataName({
          message: res.data.running,
          user: res.data.user.email,
          hello:res.data.user.firstName + " "+ res.data.user.lastName
        });
      } catch (error) {
      }
    };
    fetchHome();
    
  }, []);
  return (
    <div className="bg-blue-500 text-white font-bold text-2xl font-serif flex items-center justify-center min-h-screen">
      <div>
      <Alert/>
      <p>Hello: {dataName.hello}</p>
      <p>user: {dataName.user}</p>
      </div>
    </div>
  );
}

export default Testing;
