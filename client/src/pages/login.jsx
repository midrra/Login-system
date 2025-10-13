import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { Triangle } from "lucide-react"
import { Eye } from "lucide-react";


function Login() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white font-sans">
      <div className="w-[90%] md:w-[850px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-[#2b2540]">
        
        {/* Left side*/}
        <div className="flex-1">
        <Slider />
         </div>
         {/* Right side (Form section) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?
            <Link to="/signup" className="text-purple-400 hover:underline">
              Log in
            </Link>
          </p>

          <form className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 bg-[#3b3452] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 bg-[#3b3452] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-[#3b3452] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-[#3b3452] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Eye className="absolute right-3 top-1.5 text-gray-400 cursor-pointer"/>
            </div>

            <div className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              <label>
                I agree to the{" "}
                <Link to="/terms & conditions" className="text-purple-400 hover:underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-2 font-medium transition"
            >
              Create account
            </button>

            <div className="flex items-center gap-2 my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="text-gray-400 text-sm">or sign up with</span>
              <hr className="flex-grow border-gray-600" />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#3b3452] hover:bg-[#4a4166] rounded-md py-2 flex items-center justify-center gap-2 text-sm">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Google
              </button>
              <button className="flex-1 bg-[#3b3452] hover:bg-[#4a4166] rounded-md py-2 flex items-center justify-center gap-2 text-sm">
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
