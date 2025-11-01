import React, { useState } from "react";
import { verifyOtp, signup } from "../api/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { userContext } from "../lib/userContext";
import Alert, { showError } from "../components/Alert";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [insertOtp, setInserOtp] = useState();
  const { user } = userContext();
  const navigate = useNavigate();

  const maxLength = 6;

  const otpHandler = async (value) => {
    if (value.length === maxLength) {
      try {
        const res = await verifyOtp({
          email: user.email,
          otp: value,
        });

        const data = await signup({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          captchaToken: user.captchaToken,
        });
        navigate("/",{replace:true});
      } catch (error) {
        showError("Something went wrong!");
        console.log(error.message);
      }
    }
    setInserOtp(value);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
          <Alert />
        <div>
          <div className="text-blue-700 text-center mb-5 text-2xl font-bold">Please Enter Your Verification Code</div>
          <InputOTP maxLength={6} value={insertOtp} onChange={otpHandler} className="text-red-500">
            <InputOTPGroup>
              <InputOTPSlot index={0}   className="w-12 h-12 text-2xl text-blue-600 border-blue-400"/>
              <InputOTPSlot index={1}   className="w-12 h-12 text-2xl text-blue-600 border-blue-400"/>
              <InputOTPSlot index={2}   className="w-12 h-12 text-2xl text-blue-600 border-blue-400"/>
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3}  className="w-12 h-12 text-2xl text-blue-600 border-blue-400"/>
              <InputOTPSlot index={4}  className="w-12 h-12 text-2xl text-blue-600 border-blue-400"/>
              <InputOTPSlot index={5}  className="w-12 h-12 text-2xl text-blue-600 border-blue-400"/>
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </>
  );
}

export default VerifyOtp;
