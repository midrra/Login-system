import React, { useContext } from "react";
import { AppContext } from "../context/AuthProvider";

export const userContext = () => useContext(AppContext);
