import React, { useEffect } from "react";
import { facebookLogin } from "../api/auth";
import {useNavigate} from 'react-router-dom'

function FacebookLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_App_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };


    // Load the Facebook SDK script
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  async function handleFacebookLogin(accessToken) {
  try {
    const res = await facebookLogin({token:accessToken});
    navigate('/')

  } catch (error) {
    console.error(error);
  }
}


  const handleLogin = () => {
    window.FB.login(
     function (response) {
        if (response.authResponse) {
              handleFacebookLogin(response.authResponse.accessToken)
        } else {
          console.log("User cancelled login or did not authorize.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <button
    type="button"
      onClick={handleLogin}
      className="flex-1 bg-[#3b3452] hover:bg-[#4a4166] rounded-md py-2 flex items-center justify-center gap-2 text-sm cursor-pointer"
    >
        <img 
  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Facebook_Logo.png" 
  alt="Facebook logo" 
className="w-6 h-6"
/>
      Facebook
    </button>
  );
}

export default FacebookLogin;
