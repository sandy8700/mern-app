import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user-login" element={<UserLogin />}></Route>
        <Route path="/user-signup" element={<UserSignup />}></Route>
        <Route path="/captain-login" element={<CaptainLogin />}></Route>
        <Route path="/captain-signup" element={<CaptainSignup />}></Route>
        
        <Route path="/dashboard" element={<UserDashboard />}></Route>

      </Routes>
  );
}

export default App;
