import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const RestrictedAccess = () => {
  useEffect(() => {
    toast.error("You are not allowed to access this page!", {});
  }, []); 

  return <Navigate to="/home" />;
};

export default RestrictedAccess;
