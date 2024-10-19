import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./ResidentNavbar";
import { useCookies } from "react-cookie";

function ProfileRes() {
  // State to store user details and form input
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(""); // To handle errors
  const [cookies] = useCookies(["userID"]);
  const userID = cookies.userID;
  
  // Function to fetch user profile details
  const fetchUserProfile = async () => {
    try {
      const userId = userID;
      const response = await axios.get(`http://localhost:8070/user/get/${userId}`);
      
      setUser(response.data.user); // Set user data from the response
      setLoading(false); // Stop loading
    } catch (error) {
      setError("Error fetching user profile");
      setLoading(false);
    }
  };

  // Function to handle password update
//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();
//     setPasswordUpdateError(""); // Reset any previous errors
//     setPasswordUpdateSuccess(""); // Reset success message

//     if (newPassword !== confirmNewPassword) {
//       setPasswordUpdateError("New password and confirm password do not match");
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:8070/user/updatePassword/${userID}`, {
//         oldPassword,
//         newPassword,
//       });

//       if (response.data.success) {
//         setPasswordUpdateSuccess("Password updated successfully");
//         setOldPassword("");
//         setNewPassword("");
//         setConfirmNewPassword("");
//       } else {
//         setPasswordUpdateError("Failed to update password");
//       }
//     } catch (error) {
//       setPasswordUpdateError("Error updating password");
//     }
//   };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there was an error
  }

  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-green-100">
          <h1 className="text-3xl font-bold text-green-800 mb-8">Profile</h1>
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <p>{user.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address:</label>
              <p>{user.address}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact:</label>
              <p>{user.contact}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileRes;
