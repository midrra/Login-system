import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { data } from "react-router-dom";
import Alert from "../components/Alert";

function Testing() {
  const [dataName, setDataName] = useState({});

  const realDate = () => {
    const exp = 1760684271; // your JWT exp value
    const date = new Date(exp * 1000); // convert seconds → milliseconds
    return date.toLocaleString()
  };

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get("/home/em");
        console.log(res.data)
        setDataName({
          message: res.data.running,
          user: res.data.user.email,
        });
      } catch (error) {
      }
    };
    fetchHome();
    
  }, []);
  return (
    <div className="color-blue-500 font-bold">
      <Alert/>
      <p>User email: {dataName.message}</p>
      <p>user: {dataName.user}</p>
    </div>
  );
}

export default Testing;
