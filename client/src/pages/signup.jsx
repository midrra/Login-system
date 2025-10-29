import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { Eye } from "lucide-react";
import InputField from "../components/InputField";
import { Formik } from "formik";
import * as Yup from "yup";
import { signup, verifyOtp, createOtp } from "../api/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { Spinner } from "@/components/ui/spinner";
import { GoogleLogin } from "../components/GoogleLogin";
import Alert, { showError } from "../components/Alert";
import { userContext } from "../lib/userContext";
import FacebookLogin from "../components/FacebookLogin";

function Login() {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const { setUser, setError } = userContext();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Enter Your First Name"),
    lastName: Yup.string().required("Enter Your Last Name"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
    agree: Yup.bool().oneOf([true], "You must agree to the Terms & Conditions"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white font-sans">
      <Alert />
      <div className="w-[90%] md:w-[850px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-[#2b2540]  md:h-[98vh]">
        {/* Left side*/}
        <div className="flex-1">
          <Slider />
        </div>
        {/* Right side (Form section) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Sign up</h2>
          <p className="text-sm text-gray-400 mb-6">
            Already have an account?
            <Link to="/login" className="text-purple-400 hover:underline pl-1">
              Login
            </Link>
          </p>

          {/* structure yup and formik */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              agree: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                if (!captchaToken) {
                  setCaptchaError({ general: "captcha filed to execute" });
                  setSubmitting(true);
                  retrun;
                }
                await createOtp({
                  email: values.email,
                });
                setUser({ ...values, captchaToken });
                navigate("/signup/verify-otp", { replace: true });

                 setSubmitting(false);
              } catch (error) {
                setSubmitting(false);
                showError(
                  error.message === "Invalid credentials"
                    ? "Invalid email or password"
                    : "Login failed. Please try again."
                );
              }
            }}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              isSubmitting,
              touched,
              handleBlur,
              setFieldTouched,
            }) => (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div
                  className={`flex gap-3 ${
                    (touched.firstName || touched.lastName) && "!mb-1"
                  }`}
                >
                  <InputField
                    type="text"
                    placeholder="First name"
                    className={`w-1/2 ${touched.firstName && "!mb-1"}`}
                    value={values.firstName}
                    name="firstName"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("firstName", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  <InputField
                    type="text"
                    placeholder="Last name"
                    className={`w-1/2 ${touched.lastName && "!mb-1"}`}
                    value={values.lastName}
                    name="lastName"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("lastName", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                {(touched.firstName || touched.lastName) && (
                  <div
                    className={`flex gap-10 ${
                      (touched.firstName || touched.lastName) && "!mb-1"
                    }`}
                  >
                    {touched.firstName && errors.firstName && (
                      <p
                        className={`text-red-500 ${
                          touched.firstName && "!mb-1"
                        }`}
                      >
                        {errors.firstName}
                      </p>
                    )}
                    {touched.lastName && errors.lastName && (
                      <p
                        className={`text-red-500 ${
                          touched.lastName && "!mb-1"
                        }`}
                      >
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                )}
                <InputField
                  type="Email"
                  placeholder="Email"
                  className={`w-full ${touched.email && "!mb-1"}`}
                  value={values.email}
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("email", true, false);
                  }}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <p className={`text-red-500 ${touched.email && "!mb-1"}`}>
                    {errors.email}
                  </p>
                )}
                <div className="relative">
                  <InputField
                    type={check ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full ${touched.password && "!mb-1"}`}
                    value={values.password}
                    name="password"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched("password", true, false);
                    }}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <p
                      className={`text-red-500 ${touched.password && "!mb-1"}`}
                    >
                      {errors.password}
                    </p>
                  )}
                  <Eye
                    className="absolute right-3 top-1.5 text-gray-400 cursor-pointer"
                    onClick={() => setCheck((prev) => !prev)}
                  />
                </div>
                <div
                  className={`flex items-center text-sm  ${
                    touched.agree && "!mb-1"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="agree"
                    checked={values.agree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mr-2 cursor-pointer`}
                  />
                  <label>
                    I agree to the
                    <Link
                      to="/terms-conditions"
                      className="text-purple-400 hover:underline pl-1"
                    >
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
                {touched.agree && errors.agree && (
                  <p
                    className={`text-red-500 text-sm  ${
                      touched.agree && "!mb-1"
                    }`}
                  >
                    {errors.agree}
                  </p>
                )}

                {/* reCAPTCHA v2 */}
                <div className="my-4">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      if (token)
                        setCaptchaError((prev) => ({ ...prev, general: "" }));
                    }}
                  />
                  <p className="text-red-500">{captchaError.general}</p>
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-2 font-medium transition cursor-pointer"
                  >
                    Create account
                    {isSubmitting && (
                      <Spinner className="absolute top-3 spinner-style md:left-25 sm:left-45 left-26" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 my-4">
                  <hr className="flex-grow border-gray-600" />
                  <span className="text-gray-400 text-sm">or login with</span>
                  <hr className="flex-grow border-gray-600" />
                </div>

                <div className="flex gap-3">
                  <GoogleLogin />
                  <FacebookLogin />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
