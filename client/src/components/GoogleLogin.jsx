import React, { useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export function GoogleLogin() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
    });



    // google.accounts.id.renderButton(
    //   document.getElementById("googleSignInDiv"),
    //   {
    //     theme: "filled_blue", 
    // size: "large",        
    // text: "continue_with", 
    // shape: "pill",       
    // logo_alignment: "left",
    //   }
    // );

  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const token = response.credential;
      const decoded = jwtDecode(token);
      console.log("Decoded user:", decoded);

      // Send token to backend for verification
      const res = await axios.post("http://localhost:3000/auth/google", {
        token,
      });

      // Save the returned user info or token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(`Welcome ${res.data.user.name}`);
    } catch (err) {
      console.error(err);
    }
  };
     const handleCustomGoogleLogin = () => {
    // Opens Google One Tap or popup
    google.accounts.id.prompt(); 
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="mb-4 text-xl font-semibold">Login with Google</h2>
      <button onClick={handleCustomGoogleLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg" id="googleSignInDiv">Google</button>
      {/* <div onClick={buttonHandler}></div> */}
    </div>
  );
}

