import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../api/auth";
import api from "../api/axios";

export function GoogleLogin() {
  const navigate = useNavigate();

  const handlePopupLogin = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: "email profile openid",
      callback: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        try {
          const data = await googleLogin({
            token: accessToken,
          });
          console.log("Login succefully", data);

          const res = await api.get("/home/em");
          const role = res.data.user.role;
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.log("Login failed", error.message);
        }
      },
    });

    client.requestAccessToken();
  };

  return (
    <button
      type="button"
      onClick={handlePopupLogin}
      className="flex-1 bg-[#3b3452] hover:bg-[#4a4166] rounded-md py-2 flex items-center justify-center gap-2 text-sm cursor-pointer"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-4 h-4"
      />
      Google
    </button>
  );
}
