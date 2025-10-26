import React, { useState } from "react";
import { verifyOtp, signup } from "../api/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation } from "react-router-dom";

function VerifyOtp() {
  const { state } = useLocation();
  const [insertOtp, setInserOtp] = useState();

  const maxLength = 6;

  const otpHandler = async (value) => {
    if (value.length === maxLength) {
      try {
        const res = await verifyOtp({
          email: "el.theearth@gmail.com",
          otp: value,
        });
        console.log(res, "from verfyed OTP");
        // return res.data;
        console.log(state, "the state comes from fromik");

        const data = await signup({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          captchaToken: state.captchaToken,
        });
        console.log(data, "signupd");
        Navigate("/")
      } catch (error) {
        console.log(error.message);
      }
    }
    setInserOtp(value);
  };

  return (
    <>
      <div className="text-center">Please Enter Your Verification Code</div>
      <InputOTP maxLength={6} value={insertOtp} onChange={otpHandler}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </>
  );
}

export default VerifyOtp;
