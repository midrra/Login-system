import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { Eye } from "lucide-react";
import InputField from "../components/InputField";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { login } from "../api/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { Spinner } from "@/components/ui/spinner";
import { GoogleLogin } from "../components/GoogleLogin";
import Alert, { showError } from "../components/Alert";
import api from "../api/axios";
import FacebookLogin from "../components/FacebookLogin";

function Login() {
  const [check, setCheck] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [AlertFire, setAlertFire] = useState(false);
  // const { setErrors } = useFormikContext();

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Enter Your Name"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
    agree: Yup.bool().oneOf([true], "You must agree to the Terms & Conditions"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white font-sans">
      <Alert />
      <div className="w-[90%] md:w-[850px] flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-[#2b2540] md:h-[98vh]">
        {/* Left side*/}
        <div className="flex-1">
          <Slider />
        </div>
        {/* Right side (Form section) */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-2">Login</h2>
          <p className="text-sm text-gray-400 mb-6">
            Create an account?
            <Link to="/signup" className="text-purple-400 hover:underline pl-1">
              Signup
            </Link>
          </p>

          {/* structure yup and formik */}
          <Formik
            initialValues={{ name: "", email: "", password: "", agree: false }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              if (!captchaToken) {
                setErrors({ general: "captcha filed to execute" });
                setSubmitting(true);
                retrun;
              }
              try {
                const data = await login({
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  captchaToken,
                });
                setSubmitting(false);
                const res = await api.get("/home/em");
                const role = res.data.user.role;
                if (role === "admin") {
                  navigate("/admin-dashboard");
                } else {
                  navigate("/",);
                }
              } catch (error) {
                setSubmitting(false);

                console.log(error.message);
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
              setErrors,
              isSubmitting,
              touched,
              handleBlur,
              setFieldTouched,
            }) => (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  placeholder="Your name"
                  className={`w-full ${touched.name && "!mb-1"}`}
                  value={values.name}
                  name="name"
                  onChange={(e) => {
                    handleChange(e);
                    setFieldTouched("name", true, false);
                  }}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <p className={`text-red-500 ${touched.name && "!mb-1"}`}>
                    {errors.name}
                  </p>
                )}
                <InputField
                  type="Email"
                  placeholder="Email"
                  className={`w-full ${touched.email && "!mb-1"}`}
                  name="email"
                  value={values.email}
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
                    name="password"
                    className="w-full"
                    value={values.password}
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
                        setErrors((prev) => ({ ...prev, general: "" }));
                    }}
                  />
                  <p className="text-red-500">{errors.general}</p>
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 rounded-md py-2 font-medium transition cursor-pointer"
                  >
                    Login
                    {isSubmitting && (
                      <Spinner className="absolute top-3 spinner-style-login md:left-34 sm:left-53 left-30" />
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
