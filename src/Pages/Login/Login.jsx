import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { api } from "../../utils/url";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/slices/user.jsx";
import Loader from "../../Components/Loader/Loader.jsx";


const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      dispatch(loginStart());

      const res = await api.post("api/auth/login", formData);
      console.log(res);
      toast(res?.data?.token ? res?.data?.message + " 😊" : res?.data?.message + " 😞", {
        style: {
          padding: "24px",
          backgroundColor: "var(--white-color)",
          border: "none",
          color: "var(--black-color)",
          fontSize: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });

      if (res?.data?.token) {
        dispatch(loginSuccess(res?.data?.data));
        localStorage.setItem("token", JSON.stringify(res?.data?.token));
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      dispatch(loginFailure(error?.response?.data?.message));
      console.log(error);
      toast(error?.response?.data?.message + " 😞", {
        style: {
          padding: "24px",
          backgroundColor: "var(--white-color)",
          border: "none",
          color: "var(--black-color)",
          fontSize: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }
    // Handle login form submission logic here
  };

  return (
    <>
      {user?.loading && <Loader />}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default Login;
