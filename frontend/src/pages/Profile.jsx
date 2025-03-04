import { useState } from "react";
import { Camera, Pencil, Save, User, Mail, Lock } from "lucide-react";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Administrator",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Profile Settings</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-gray-700"
          />
          <button className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full">
            <Camera size={18} />
          </button>
        </div>
        <p className="mt-3 text-lg">{user.name}</p>
        <span className="text-sm text-gray-400">{user.role}</span>
      </div>

      <div className="space-y-4">
        {/* Name Field */}
        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-md">
          <User size={20} />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editing}
            className="bg-transparent flex-1 outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-md">
          <Mail size={20} />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!editing}
            className="bg-transparent flex-1 outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-md">
          <Lock size={20} />
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={handleChange}
            disabled={!editing}
            className="bg-transparent flex-1 outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          onClick={() => setEditing(!editing)}
        >
          {editing ? <Save size={18} /> : <Pencil size={18} />}
          {editing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
