import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="min-h-screen bg-base-main flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-6xl text-color-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading delicious reviews...</p>
        </div>
      </div>
    );

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ message: "please login first" }}></Navigate>
  );
};

export default PrivateRoute;
