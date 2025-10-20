import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { data } from "react-router-dom";

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
        const res = await api.get("/home");
        console.log(res.data)
        setDataName({
          data: res.data.running,
          user: res.data.user.email,
          ID: res.data.user.id,
          time: res.data.user.exp,
        });
      } catch (error) {
      }
    };
    fetchHome();
  }, []);
  return (
    <div className="color-blue-500 font-bold">
      <p>User email: {dataName.data}</p>
      <p>user: {dataName.user}</p>
      <p>ID: {dataName.ID}</p>
      <p>Token expires at: {realDate(dataName.time)}</p>
    </div>
  );
}

export default Testing;
