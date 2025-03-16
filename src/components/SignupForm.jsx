import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate();
  const nameInputRef = useRef(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (nameInputRef.current) {
  //       nameInputRef.current.focus(); // Focus the name input field when the component mounts
  //     }
  //   }, 0);
  // }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Signup Successful");
      navigate("/login"); // Navigate to the login page upon successful signup
    } catch (error) {
      alert("Signup Failed: " + error.response.data.message);
    }
  };

  const password = watch("password"); // Get the value of the password field

  return (
    <div className="container mt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
      >
        <h3 className="text-center">Sign Up</h3>
        <div className="mb-3 p-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name", { required: "Please enter your name" })}
            // ref={nameInputRef}
          />
          {errors.name && (
            <div className="alert alert-danger mt-2">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3 p-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <div className="alert alert-danger mt-2">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mb-3 p-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <div className="alert alert-danger mt-2">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="mb-3 p-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            {...register("confirmpassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmpassword && (
            <div className="alert alert-danger mt-2">
              {errors.confirmpassword.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
          Sign Up
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg mb-2 ms-3"
          onClick={() => navigate("/login")}
        >
          Back
        </button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
};

export default SignupForm;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const nameInputRef = useRef(null);

//   useEffect(() => {
//     nameInputRef.current.focus(); // Focus the email input field when the component mounts
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/auth/signup",
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       setMessage("Signup Successful");
//     } catch (error) {
//       setMessage("Signup Failed: " + error.response.data.message);
//     }
//   };

//   const handleBack = () => {
//     navigate("/login"); // Navigate to the login page
//   };

//   return (
//     <div className="container mt-4">
//       {message && <div className="alert alert-info">{message}</div>}
//       <form
//         onSubmit={handleSubmit}
//         className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
//       >
//         <h3 className="text-center">Sign Up</h3>
//         <div className="mb-3 p-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             ref={nameInputRef}
//           />
//         </div>
//         <div className="mb-3 p-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3 p-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3 p-3">
//           <label htmlFor="confirmpassword" className="form-label">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="confirmpassword"
//             name="confirmpassword"
//             value={formData.confirmpassword}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
//           Sign Up
//         </button>
//         <button
//           type="button"
//           className="btn btn-secondary btn-lg mb-2 ms-3"
//           onClick={handleBack}
//         >
//           Back
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;
