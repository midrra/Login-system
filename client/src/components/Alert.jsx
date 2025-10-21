import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

export const showError = (message) => {
  toast.error(message || "Something went wrong", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Bounce,
  });
};

function Alert() {
  return <ToastContainer />;
}

export default Alert;
