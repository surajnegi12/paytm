import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { URL } from "../assets/url";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
const user= useSelector((state)=>state.userDetails.userDetails)
const currentUserId= user._id;
  useEffect(() => {
    async function getAllUsers() {
      try {
        const url = searchInput
          ? `${URL}/api/v1/user/bulk?filter=${searchInput}`
          : `${URL}/api/v1/user/bulk`;
        const response = await axios.get(url);
        const filteredUsers = response.data.user.filter(
          (u) => u._id !== currentUserId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    getAllUsers();
  }, [searchInput,currentUserId]);

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">People</h2>
        <div className="relative w-full max-w-xs">
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/50 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 text-gray-800 placeholder-gray-500"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-gray-600 text-center">No users found.</p>
        ) : (
          users.map((user, index) => (
            <User key={user._id} user={user} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

function User({ user, index }) {
  return (
    <div
      className={`bg-white/50 backdrop-blur-md rounded-xl p-4 flex justify-between items-center transform transition-all hover:scale-102 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)] animate-fade-in delay-${
        index * 100
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
          {user.firstName[0].toUpperCase()}
        </div>
        <div>
          <p className="text-gray-900 font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-600">{user.username}</p>
        </div>
      </div>
      <Link to={`/send?id=${user._id}&name=${user.firstName}`}>
        <Button
          label="Send Money"
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-sm"
        />
      </Link>
    </div>
  );
}