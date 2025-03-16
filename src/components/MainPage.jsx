import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    // Assume user's name is stored in localStorage after login
    const storedname = localStorage.getItem("name");
    if (storedname) {
      setName(storedname);
    } else {
      // If the user's name is not in localStorage, make an API call to fetch it
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/v1/users", // Ensure this endpoint is correct
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("User data fetched successfully:", response.data);
          setName(response.data.data.user.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome to Your Dashboard</h2>
      <p>You are logged in as {name}!</p>
      <Link to="/updateMe" className="btn btn-primary">
        Update Your Profile
      </Link>
      <Link to="/deleteUser" className="btn btn-danger">
        Delete Your Account
      </Link>
    </div>
  );
};

export default MainPage;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const MainPage = () => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     // Assume user's name is stored in localStorage after login
//     const storedname = localStorage.getItem("name");
//     if (storedname) {
//       setName(storedname);
//     } else {
//       // If the user's name is not in localStorage, make an API call to fetch it
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:5000/api/v1/users",
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           setName(response.data.data.user.name);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };

//       fetchUserData();
//     }
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2>Welcome to Your Dashboard</h2>
//       <p>You are logged in as {name}!</p>
//       <Link to="/updateMe" className="btn btn-primary">
//         Update Your Profile
//       </Link>
//     </div>
//   );
// };

// export default MainPage;

// // import React from "react";
// // import { Link } from "react-router-dom";

// // const MainPage = () => {
// //   return (
// //     <div className="container mt-4">
// //       <h2>Welcome to Your Dashboard</h2>
// //       <p>You are logged in!</p>
// //       <Link to="/updateMe" className="btn btn-primary">
// //         Update Your Profile
// //       </Link>
// //     </div>
// //   );
// // };

// // export default MainPage;
