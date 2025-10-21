import React, { useEffect } from "react";

const AppleLogin = () => {
  useEffect(() => {
    // Load Apple SDK dynamically if not already loaded
    if (!window.AppleID) {
      const script = document.createElement("script");
      script.src =
        "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
      script.async = true;
      script.onload = initApple;
      document.body.appendChild(script);
    } else {
      initApple();
    }

    function initApple() {
      window.AppleID.auth.init({
        clientId: "com.yourapp.web", // your Service ID
        scope: "name email",
        redirectURI: "https://yourdomain.com/auth/apple/callback",
        usePopup: true,
      });
    }
  }, []);

  const handleAppleLogin = async () => {
    try {
      const response = await window.AppleID.auth.signIn(); // returns a promise now (modern way)
      const { id_token } = response.authorization;

      // Send to your backend for verification
      const res = await fetch("/api/auth/apple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token }),
      });

      const data = await res.json();
      console.log("✅ Apple login success:", data);

      // Example: save JWT or navigate
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
    } catch (error) {
      console.error("❌ Apple sign-in failed:", error);
    }
  };

  return (
    <button
      onClick={handleAppleLogin}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
        alt="Apple"
        className="w-5 h-5"
      />
      Sign in with Apple
    </button>
  );
};

export default AppleLogin;
