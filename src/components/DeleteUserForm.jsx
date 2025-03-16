import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteUserForm = ({ setIsAuthenticated }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/v1/users/deleteMe", // Ensure this endpoint is correct
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Account deleted successfully");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/"); // Navigate to the home page upon successful deletion
    } catch (error) {
      setMessage("Error deleting account: " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Delete Your Account</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <p>
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <button onClick={handleDelete} className="btn btn-danger">
        Delete Account
      </button>
    </div>
  );
};

export default DeleteUserForm;
