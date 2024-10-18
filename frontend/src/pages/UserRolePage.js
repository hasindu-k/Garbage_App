import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserTypeSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    { id: 1, name: "Resident", icon: "🏡" },
    { id: 2, name: "Collector", icon: "📦" },
    { id: 3, name: "Admin", icon: "🛠" },
    { id: 4, name: "Recorder", icon: "🗑" },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const proceedToLogin = () => {
    const role = roles.find((role) => role.id === selectedRole);
    if (role) {
      navigate("/register2", { state: { selectedRole: role.name } });
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-lg w-full">
        <h3 className="text-2xl text-center font-bold text-gray-700 mb-6">
          Select user type
        </h3>
        <p className="text-center text-gray-500 mb-8">
          To continue, select your role in this project, please. <br />
          If you don't know your role, clarify it with your Project Manager.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="text-center cursor-pointer"
              onClick={() => handleRoleSelect(role.id)}
            >
              <div
                className={`p-4 rounded-full mx-auto mb-2 ${
                  selectedRole === role.id
                    ? "bg-green-100 border border-green-500"
                    : "bg-blue-100"
                }`}
              >
                <span className="text-3xl">{role.icon}</span>
              </div>
              <p className="text-gray-600 font-semibold">{role.name}</p>
            </div>
          ))}
        </div>

        <button
          className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-lg ${
            !selectedRole
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
          disabled={!selectedRole}
          onClick={proceedToLogin}
        >
          Continue to Register
        </button>
            
        <div className="w-full flex flex-col">
          {/* <Link className="bg-green-500 text-white py-2 px-3 rounded-lg" to={"/login"}>Already have an account? Login</Link> */}
          <Link className="text-white text-center w-full mt-6 bg-green-500 py-2 rounded-lg" to={"/"}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;