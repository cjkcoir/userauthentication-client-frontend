import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateMeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus(); // Focus the email input field when the component mounts
  }, []);

  // Fetch current user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFormData({
          name: response.data.data.user.name,
          email: response.data.data.user.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/v1/users/updateMe",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(
        "Profile update failed: " +
          (error.response?.data?.message || "Unknown error occurred")
      );
    }
  };

  const handleBack = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-info">{message}</div>}
      <form
        onSubmit={handleSubmit}
        className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
      >
        <h3 className="text-center">Update Profile</h3>
        <div className="mb-3 p-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameInputRef}
          />
        </div>
        <div className="mb-3 p-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
          Update
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg mb-2 ms-3"
          onClick={handleBack}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default UpdateMeForm;
