import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { Eye } from "lucide-react";
import InputField from "../components/InputField";

function Login() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("signup submit is clicked!!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white font-sans">
      <div className="w-[90%] md:w-[850px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-[#2b2540]">
        {/* Left side*/}
        <div className="flex-1">
          <Slider />
        </div>
        {/* Right side (Form section) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Signup</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?
            <Link to="/login" className="text-purple-400 hover:underline pl-1">
              Log in
            </Link>
          </p>

          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex gap-3">
              <InputField
                type="text"
                placeholder="First name"
                className="w-1/2"
              />
              <InputField
                type="text"
                placeholder="Last name"
                className="w-1/2"
              />
            </div>
            <InputField type="Email" placeholder="Email" className="w-full" />
            <div className="relative">
              <InputField
                type="password"
                placeholder="Enter your password"
                className="w-full"
              />
              <Eye className="absolute right-3 top-1.5 text-gray-400 cursor-pointer" />
            </div>
            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2 cursor-pointer" />
              <label>
                I agree to the
                <Link
                  to="/terms & conditions"
                  className="text-purple-400 hover:underline pl-1"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-2 font-medium transition cursor-pointer"
            >
              Create account
            </button>

            <div className="flex items-center gap-2 my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="text-gray-400 text-sm">or login in with</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#3b3452] hover:bg-[#4a4166] rounded-md py-2 flex items-center justify-center gap-2 text-sm cursor-pointer">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Google
              </button>
              <button className="flex-1 bg-[#3b3452] hover:bg-[#4a4166] rounded-md py-2 flex items-center justify-center gap-2 text-sm cursor-pointer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg"
                  alt="Apple"
                  className="w-4 h-4 text-white"
                />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
