import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import AdminLogin from "./components/Admin/AdminLogin";
import UserLogin from "./components/User/UserLogin";
import AboutUs from "./components/AboutUs/AboutUs";
import UserSignUp from "./components/User/UserSignUp";
import AdminSignUp from "./components/Admin/AdminSignUp";
import AdminNavbar from "./components/Admin/AdminNavbar";
import UserNavbar from "./components/User/UserNavbar";
//import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProduct from "./components/Admin/AdminProduct";
import Customer from "./components/Customer/Customer";
import Confirmation from "./components/Confirmation/Confirmation"
import AdminView from "./components/Admin/AdminView";


export default function App() {
  return (
    <div>
      {/* <AdminNavbar/> */}

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/admin-signup" element={<AdminSignUp />} />

          <Route path="/admin-product" element={<AdminProduct />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/user-login/customer" element={<Customer />} />
          <Route path="/admin-signup/admin-product" element={<AdminProduct />} />
          <Route path="/user-signup/customer" element={<Customer />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin-view" element={<AdminView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
