import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const ForgotPasswordFormHook = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgotPassword",
        data, // Use the data provided by react-hook-form
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("Password Reset Email Sent");
    } catch (error) {
      setMessage(
        "Password Reset Failed: " +
          (error.response?.data?.message || error.message)
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
        onSubmit={handleSubmit(onSubmit)} // Correctly apply the onSubmit handler here
        className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
      >
        <h3 className="text-center">Forgot Password</h3>
        <div className="mb-3  p-3">
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
            <p className="text-danger fw-bold">{errors.email.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg mb-2 ms-3"
          onClick={handleBack}
        >
          Back
        </button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
};

export default ForgotPasswordFormHook;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

// const ForgotPasswordFormHook = () => {
//   const [formData, setFormData] = useState({ email: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   //   const emailInputRef = useRef();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     control,
//   } = useForm();

//   //   useEffect(() => {
//   //     emailInputRef.current.focus(); // Focus the email input field when the component mounts
//   //   }, []);

//   //   const handleChange = (e) => {
//   //     setFormData({ ...formData, [e.target.name]: e.target.value });
//   //   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/auth/forgotPassword",
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       setMessage("Password Reset Email Sent");
//     } catch (error) {
//       setMessage("Password Reset Failed: " + error.response.data.message);
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
//         <h3 className="text-center">Forgot Password</h3>
//         <div className="mb-3  p-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             // name="email"
//             // value={formData.email}
//             // onChange={handleChange}
//             // ref={emailInputRef}
//             onSubmit={handleSubmit(onSubmit)}
//             {...register("email", {
//               required: "Please enter your email",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Please enter a valid email",
//               },
//             })}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
//           Submit
//         </button>
//         <button
//           type="button"
//           className="btn btn-secondary btn-lg mb-2 ms-3"
//           onClick={handleBack}
//         >
//           Back
//         </button>
//       </form>
//       <DevTool control={control}></DevTool>
//     </div>
//   );
// };

// export default ForgotPasswordFormHook;
