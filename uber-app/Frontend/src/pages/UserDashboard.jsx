import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user-login");

  };

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-2xl">User Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="bg-[#10b461] text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl">Welcome to your dashboard 👋</h2>
        <p className="text-gray-600 mt-2">You are now logged in successfully.</p>
      </div>
    </div>
  );
};

export default UserDashboard;
