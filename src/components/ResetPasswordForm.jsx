import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordForm = () => {
  const { token } = useParams(); // Get the token from the URL
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/resetPassword/${token}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("Password reset successful");
      navigate("/login");
    } catch (error) {
      // Handle both known and unknown errors
      setMessage(
        "Password reset failed: " +
          (error.response?.data?.message || "Unknown error occurred")
      );
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.patch(
  //         `http://localhost:5000/api/v1/users/resetPassword/${token}`,
  //         formData,
  //         {
  //           headers: { "Content-Type": "application/json" },
  //         }
  //       );
  //       setMessage("Password reset successful");
  //       navigate("/login");
  //     } catch (error) {
  //       // Handle both known and unknown errors
  //       setMessage(
  //         "Password reset failed: " +
  //           (error.response?.data?.message || "Unknown error occurred")
  //       );
  //     }
  //   };

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-info">{message}</div>}
      <form
        onSubmit={handleSubmit}
        className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
      >
        <h3 className="text-center">Reset Password</h3>
        <div className="mb-3 p-3">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3 p-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
