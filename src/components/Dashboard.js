import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold">Welcome to dashboard</h1>
        <p className="my-2">
          Welcome <span className=" font-semibold">{user?.email}</span>
        </p>
        <button className="bg-blue-500 py-2 w-full rounded hover:bg-blue-600" onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Dashboard;
