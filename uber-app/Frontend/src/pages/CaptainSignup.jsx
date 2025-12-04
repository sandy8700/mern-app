import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CaptainContext  from "../context/CaptainContext";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  // const { setCaptain } = React.useContext(CaptainContext);
const capitalizeCase = (str) =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());
  const handleSubmit = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType: vehicleType === "moto" ? "motorcycle" : vehicleType, // Correct vehicle type
      },
      location: {
        ltd: 0, // Default to 0
        lng: 0, // Default to 0
      },
      status: "inactive",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );
      if (response.status === 201) {
        const data = response.data;
        // setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        toast.success("Captain signup successful!");

        setTimeout(() => navigate("/captain-home"), 600);
      }
    } catch (error) {
      console.error(
        "Captain signup error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Signup failed. Check console for details."
      );
    }
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />
          <ToastContainer />

          <form onSubmit={handleSubmit}>
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What's your name
            </h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-sm px-4 py-2  text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(capitalizeCase(e.target.value))}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-sm px-4 py-2  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(capitalizeCase(e.target.value))}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              className="bg-[#eeeeee] mb-7 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base"
              required
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
            <div className="flex gap-4 mb-7">
              <input
                className="bg-[#eeeeee] w-1/2 rounded-sm px-4 py-2  text-lg placeholder:text-base"
                type="text"
                placeholder="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded-sm px-4 py-2  text-lg placeholder:text-base"
                type="text"
                placeholder="plate"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
              />
            </div>
            <div className="flex gap-4 mb-7">
              <input
                className="bg-[#eeeeee] w-1/2 rounded-sm px-4 py-2  text-lg placeholder:text-base"
                type="text"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-sm px-4 py-2 w-full text-lg placeholder:text-base">
              Create account
            </button>
          </form>

          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
