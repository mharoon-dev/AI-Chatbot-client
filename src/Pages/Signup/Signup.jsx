import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, Navigate } from "react-router-dom";
import fileToBase64 from "../../utils/helper.js";
import { api } from "../../utils/url.js";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader.jsx";
import { useSelector } from "react-redux";

const Signup = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    img: null,
  });



  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && name === "img") {
      const file = files[0];
      try {
        const base64Image = await fileToBase64(file);
        setFormData({
          ...formData,
          [name]: base64Image,
        });
        setPreviewUrl(base64Image);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    console.log(formData);

    if (!formData.name || !formData.email || !formData.password) {
      toast("Please fill in all required fields. 😞", {
        style: {
          padding: "24px",
          backgroundColor: "var(--white-color)",
          border: "none",
          color: "var(--black-color)",
          fontSize: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
      return;
    }

    try {
      const res = await api.post("api/auth/signup", formData);
      console.log(res);
      toast(res?.data?.message + " 😊", {
        style: {
          padding: "24px",
          backgroundColor: "var(--white-color)",
          border: "none",
          color: "var(--black-color)",
          fontSize: "16px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
      setLoader(false);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
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
      setLoader(false);
    }
    // Handle form submission logic here
  };

  return (
    <>
      {loader && <Loader />}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-title">Sign Up</h2>

          <div className="form-group">
            {/* <label htmlFor="img">Profile Image</label> */}
            <div className="image-upload-container">
              <div
                className="image-preview"
                onClick={() => document.getElementById("img").click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" />
                ) : (
                  <div className="image-placeholder">
                    <i className="fas fa-user fa-2x"></i>
                  </div>
                )}
                <div className="hover-overlay">
                  <i className="fas fa-camera"></i>
                </div>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <br />

          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default Signup;
