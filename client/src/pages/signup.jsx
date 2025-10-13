import { useState } from "react";
import InputField from "../components/InputField";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await signup(formData);
    //   alert("Signup successful! Please login.");
    //   navigate("/login");
    // } catch (err) {
    //   alert(err.response?.data?.message || "Signup failed");
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-20 border p-6 rounded">
      <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          type="text"
          // value={formData.name}
          // onChange={handleChange}
        />
        {/* <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        /> */}
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Sign Up
        </button>
      </form>
      {/* <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p> */}
    </div>
  );
}

export default Signup;
