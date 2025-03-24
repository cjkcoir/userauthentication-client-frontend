import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import UpdateMeForm from "./components/UpdateMeForm";
import MainPage from "./components/MainPage";
import SignupForm from "./components/SignupForm";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
import DeleteUserForm from "./components/DeleteUserForm";
import ForgotPasswordFormHook from "./components/ForgotPasswordFormHook";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <h1 className="text-center text-primary">Client App</h1>
      <Router>
        <div className="container mt-4">
          <Routes>
            <Route
              path="/login"
              element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/signup" element={<SignupForm />} />
            {/* <Route path="/forgotPassword" element={<ForgotPasswordForm />} /> */}
            <Route
              path="/forgotPassword"
              element={<ForgotPasswordFormHook />}
            />
            <Route
              path="/resetPassword/:token"
              element={<ResetPasswordForm />}
            />
            <Route
              path="/updateMe"
              element={
                isAuthenticated ? <UpdateMeForm /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? <MainPage /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/deleteUser"
              element={
                isAuthenticated ? (
                  <DeleteUserForm setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import SignupForm from "./components/SignupForm";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
// import ResetPasswordForm from "./components/ResetPasswordForm";
// import MainPage from "./components/MainPage";
// // import UpdateMeForm from "./components/UpdateMeForm";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <>
//       <h1 className="text-center text-primary">Users App</h1>
//       <Router>
//         <div className="container mt-4">
//           <Routes>
//             <Route
//               path="/login"
//               element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
//             />
//             <Route path="/signup" element={<SignupForm></SignupForm>} />
//             <Route
//               path="/forgotPassword"
//               element={<ForgotPasswordForm></ForgotPasswordForm>}
//             />
//             <Route
//               path="/resetPassword/:token"
//               element={<ResetPasswordForm />}
//             />
//             <Route
//               path="/updateMe"
//               element={
//                 isAuthenticated ? <UpdateMeForm /> : <Navigate to="/login" />
//               }
//             />

//             <Route
//               path="/"
//               element={
//                 isAuthenticated ? <MainPage /> : <Navigate to="/login" />
//               }
//             />

//             {/* <Route
//               path="/updateMe"
//               element={
//                 isAuthenticated ? <UpdateMeForm /> : <Navigate to="/login" />
//               }
//             /> */}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;

// // // import "./App.css";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import React, { useState } from "react";
// // // import {
// // //   BrowserRouter as Router,
// // //   Route,
// // //   Routes,
// // //   Navigate,
// // // } from "react-router-dom";
// // // import LoginForm from "./components/LoginForm";
// // // // import SignupForm from "./components/SignupForm";
// // // // import ForgotPasswordForm from "./components/ForgotPasswordForm";
// // // // import UpdateMeForm from "./components/UpdateMeForm";

// // // function App() {
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // //   return (
// // //     <>
// // //       <h1 className="text-center text-primary">client app</h1>
// // //       <Router>
// // //         <div className="container mt-4">
// // //           <Routes>
// // //             <Route path="/login">
// // //               <LoginForm setIsAuthenticated={setIsAuthenticated} />
// // //             </Route>
// // //             <Route path="/signup">{/* <SignupForm /> */}</Route>
// // //             <Route path="/forgotPassword">{/* <ForgotPasswordForm /> */}</Route>
// // //             <Route path="/updateMe">
// // //               {isAuthenticated ? <UpdateMeForm /> : <Navigate to="/login" />}
// // //             </Route>
// // //             <Navigate from="/" to="/login" />
// // //           </Routes>
// // //         </div>
// // //       </Router>
// // //     </>
// // //   );
// // // }

// // // export default App;
