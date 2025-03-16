import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const LoginForm = ({ setIsAuthenticated }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    emailInputRef.current?.focus(); // Focus the email input field when the component mounts
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("Login Successful");
      localStorage.setItem("token", response.data.Token);
      setIsAuthenticated(true);
      navigate("/"); // Navigate to the main page upon successful login
    } catch (error) {
      setMessage("Login Failed: " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-info">{message}</div>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
      >
        <h3 className="text-center">Login</h3>
        <div className="mb-3 p-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email",
              },
            }}
            render={({ field }) => (
              <input
                type="email"
                className="form-control"
                id="email"
                ref={(e) => {
                  field.ref(e);
                  emailInputRef.current = e;
                }}
                {...field}
              />
            )}
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
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            render={({ field }) => (
              <input
                type="password"
                className="form-control"
                id="password"
                {...field}
              />
            )}
          />
          {errors.password && (
            <div className="alert alert-danger mt-2">
              {errors.password.message}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
          Login
        </button>
      </form>
      <div className="mt-3 text-center">
        <a href="/signup" className="text-success">
          Don't have an account? Sign Up
        </a>
        <br />
        <a href="/forgotPassword" className="text-danger">
          Forgot Password?
        </a>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default LoginForm;

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { DevTool } from "@hookform/devtools";
// import { useForm, Controller } from "react-hook-form";

// const LoginForm = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const emailInputRef = useRef(null);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     control,
//   } = useForm();

//   // useEffect(() => {
//   //   emailInputRef.current.focus(); // Focus the email input field when the component mounts
//   // }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/auth/login",
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       setMessage("Login Successful");
//       localStorage.setItem("token", response.data.Token);
//       setIsAuthenticated(true);
//       navigate("/"); // Navigate to the main page upon successful login
//     } catch (error) {
//       setMessage("Login Failed: " + error.response.data.message);
//     }
//   };

//   const password = watch("password"); // Get the value of the password field

//   return (
//     <div className="container mt-4">
//       {message && <div className="alert alert-info">{message}</div>}
//       <form
//         // onSubmit={handleSubmit}
//         className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <h3 className="text-center">Login</h3>
//         <div className="mb-3 p-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             // value={formData.email}
//             // onChange={handleChange}
//             // ref={emailInputRef}
//             {...register("email", {
//               required: "Please enter your email",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Please enter a valid email",
//               },
//             })}
//           />

//           {errors.email && (
//             <div className="alert alert-danger mt-2">
//               {errors.email.message}
//             </div>
//           )}
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
//             // value={formData.password}
//             // onChange={handleChange}
//             {...register("password", {
//               required: "Please enter your password",
//               minLength: {
//                 value: 8,
//                 message: "Password must be at least 8 characters long",
//               },
//             })}
//           />
//           {errors.password && (
//             <div className="alert alert-danger mt-2">
//               {errors.password.message}
//             </div>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5">
//           Login
//         </button>
//       </form>
//       <div className="mt-3 text-center">
//         <a href="/signup" className="text-success">
//           Don't have an account? Sign Up
//         </a>
//         <br />
//         <a href="/forgotPassword" className="text-danger">
//           Forgot Password?
//         </a>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const LoginForm = ({ setIsAuthenticated }) => {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [message, setMessage] = useState("");
// //   const history = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/v1/auth/login",
// //         formData,
// //         {
// //           headers: { "Content-Type": "application/json" },
// //         }
// //       );
// //       setMessage("Login Successful");
// //       // Save the token to localStorage or context state
// //       localStorage.setItem("token", response.data.token);
// //       setIsAuthenticated(true);
// //       history.push("/updateMe");
// //     } catch (error) {
// //       setMessage("Login Failed: " + error.response.data.message);
// //     }
// //   };

// //   return (
// //     <div className="container mt-4 ">
// //       {message && <div className="alert alert-info">{message}</div>}
// //       <form
// //         onSubmit={handleSubmit}
// //         className="border border-2 border-black w-25 mx-auto rounded rounded-4 bg-light"
// //       >
// //         <h3 className="text-center">Login</h3>
// //         <div className="mb-3 p-3">
// //           <label htmlFor="email" className="form-label">
// //             Email
// //           </label>
// //           <input
// //             type="email"
// //             className="form-control"
// //             id="email"
// //             name="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="mb-3 p-3">
// //           <label htmlFor="password" className="form-label">
// //             Password
// //           </label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="password"
// //             name="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <button type="submit" className="btn btn-primary btn-lg mb-2 ms-5 ">
// //           Login
// //         </button>
// //       </form>
// //       <div className="mt-3 text-center">
// //         <Link to="/signup">Don't have an account? Sign Up</Link>
// //         <br />
// //         <Link to="/forgotPassword">Forgot Password?</Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;
