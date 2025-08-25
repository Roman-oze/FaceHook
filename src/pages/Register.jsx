import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerLogo from "../assets/logo-2.svg";
import styles from "./register.module.css";
import API from "../api/index";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/signUp", formData); // Your API
      console.log("Registration success:", res.data);
      setLoading(false);
      navigate("/login"); // Redirect after success
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className={styles.signupContainer}>
        <div className="flex justify-center mb-4">
          <img src={registerLogo} alt="PhotoBooth" className="h-[51px]" />
        </div>

        <div className="bg-white p-6 border border-gray-300 mb-3">
          <h2 className="text-center font-semibold text-gray-500 text-lg mb-4">
            Sign up to see photos and videos from your friends.
          </h2>

          {error && <p className="text-red-500 mb-3 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Email"
                aria-label="Email"
              />
            </div>

            <div className="mb-2">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Full Name"
                aria-label="Full Name"
              />
            </div>

            <div className="mb-3 relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Password"
                aria-label="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
              >
                Show
              </button>
            </div>

            <div className="mb-2">
              <button
                type="submit"
                className={styles["signup-button"]}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 border border-gray-300 text-center mb-4 rounded-md">
          <p className="text-sm">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
