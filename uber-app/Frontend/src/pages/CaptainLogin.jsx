import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const isDisabled = !email.trim() || !password.trim(); // Moved outside handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = { email, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(captainData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful!");

        localStorage.setItem("token", data.token);

        setTimeout(() => {
          navigate("/captain-dashboard");
        }, 600);

        console.log("Login successful:", data);
      } else {
        toast.error(data.message || "Login failed");
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong! Try again."
      );
    }
  };

  return (
    <>
      <div className="p-7 min-h-screen flex flex-col justify-between bg-white">
        <ToastContainer />

        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt=""
        />
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="inline-block font-bold">
                What's your email
              </label>
              <input
                type="email"
                className="bg-[#eeeeee] mb-3 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="password" className="inline-block font-bold">
                Enter Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-[#eeeeee] rounded-sm px-4 py-2 w-full text-lg placeholder:text-base pr-12"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="password-error"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/12 translate-y-1/2 px-2  text-sm rounded"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              disabled={isDisabled}
              className={`flex items-center justify-center gap-3 mt-4 w-full py-2 rounded-sm text-white font-semibold
                ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#111] hover:opacity-95"
                }`}
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Join a Fleet?{" "}
            <Link to="/captain-register" className="text-blue-600">
              Resgiter as a Captain
            </Link>
          </p>
        </div>
        <Link
          to="/user-login"
          className="bg-[#d76d1e] flex items-center justify-center text-white font-semibold mb-5 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </>
  );
};

export default CaptainLogin;
