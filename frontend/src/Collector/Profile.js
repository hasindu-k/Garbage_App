import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    address: '',
    email: '',
    contact: ''
  });
  const [cookies] = useCookies(['userID']);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('Fetching profile for user ID:', cookies.userID);
        const response = await axios.get(`http://localhost:8070/user/collector/${cookies.userID}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [cookies.userID]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8070/user/collector/updateProfile`, {
        userId: cookies.userID,
        name: user.name,
        address: user.address,
        email: user.email,
        contact: user.contact,
      });

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8070/user/collector/updatePassword`, {
        userId: cookies.userID,
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setShowPasswordAlert(false); // Hide the alert after successful change
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password. Please check your current password.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-green-100">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Profile</h1>
        {!showPasswordAlert && (<form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleProfileUpdate}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact:</label>
            <input
              type="text"
              value={user.contact}
              onChange={(e) => setUser({ ...user, contact: e.target.value })}
              className="mt-1 block w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Update Profile
          </button>
          <div className="mt-4">
            <a 
              href="#"
              onClick={(e) => { e.preventDefault(); setShowPasswordAlert(true); }}
              className="text-blue-500 hover:underline"
            >
              Change Password
            </a>
          </div>
        </form>)}
        

        {showPasswordAlert && (
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label className="block text-gray-700">Current Password:</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {message && <div className="mt-4 text-green-700">{message}</div>}
      </div>
    </div>
  );
};

export default Profile;
