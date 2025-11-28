import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UserLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const apiBase = import.meta.env.VITE_BASE_URL || "";

  const validateFrontend = () => {
    let ok = true;
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!email) {
      setEmailError("Email is required");
      ok = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      ok = false;
    }
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFrontend()) return;

    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setSuccessMsg("");

    const loginData = { email, password };

    try {
      const url = `${apiBase}/users/login`;
      const response = await axios.post(url, loginData);

      const { token, user, message } = response.data || {};

      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        try {
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
          console.warn("Could not save user to localStorage", err);
        }
      }

      const successText = message || "Login successful";
      setSuccessMsg(successText);
      toast.success(successText, { position: "top-center", autoClose: 1500 });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error("Login error", err);

      if (err.response && err.response.data) {
        const backendMsg = (err.response.data.message || "").toString();
        const msgLower = backendMsg.toLowerCase();

        if (msgLower.includes("email")) {
          setEmailError(err.response.data.message);
          toast.error(err.response.data.message, { position: "top-center" });
        } else if (msgLower.includes("password")) {
          setPasswordError(err.response.data.message);
          toast.error(err.response.data.message, { position: "top-center" });
        } else if (
          msgLower.includes("invalid") ||
          msgLower.includes("wrong") ||
          msgLower.includes("credentials") ||
          msgLower.includes("mismatch")
        ) {
          setGeneralError("Invalid email or password");
          toast.error("Invalid email or password", { position: "top-center" });
        } else {
          setGeneralError(err.response.data.message || "Login failed");
          toast.error(err.response.data.message || "Login failed", {
            position: "top-center",
          });
        }
      } else {
        setGeneralError("Server unreachable. Please try again later.");
        toast.error("Server unreachable. Please try again later.", {
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !email.trim() || !password.trim();

  return (
    <>
      <div className="p-7 min-h-screen flex flex-col justify-between bg-white">
        <ToastContainer />
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="logo"
        />

        <div>
          <form onSubmit={handleSubmit} noValidate>
            {successMsg && (
              <p className="text-green-600 text-center mb-4">{successMsg}</p>
            )}
            {generalError && (
              <p className="text-red-600 text-center mb-4">{generalError}</p>
            )}

            <div className="form-group">
              <label htmlFor="email" className="inline-block font-bold">
                What's your email
              </label>
              <input
                id="email"
                type="email"
                className="bg-[#eeeeee] mb-2 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
              />
              {emailError && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="password" className="inline-block font-bold">
                Enter Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-[#eeeeee] mb-2 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base pr-12"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!passwordError}
                  aria-describedby="password-error"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2  text-sm rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {passwordError && (
                <p id="password-error" className="text-red-600 text-sm mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className={`flex items-center justify-center gap-3 mt-4 w-full py-2 rounded-sm text-white font-semibold
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#111] hover:opacity-95"}`}
            >
              {/* spinner */}
              {loading && (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              <span>{loading ? "Logging in..." : "Login"}</span>
            </button>
          </form>

          <p className="text-center mt-4">
            New here?{" "}
            <Link to="/user-signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>

        <Link
          to="/captain-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-sm px-4 py-2 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </>
  );
};

export default UserLogin;
