import React, { useEffect, useState } from "react";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import SignRoutes from "./SignRoutes";
import axios from "axios";
import { toast } from "react-toastify";


const BaseRoutes = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const BASE_URL = "http://localhost:3000";


  useEffect(() => {
    const checkAuthentication = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setAuthenticated(false);
          return;
        }
        const valid = await axios.get(`${BASE_URL}/user/getValidUser/${token}`);
        if (!valid) { 
          toast.warn("Sua sessão expirou, faça login novamente.")
          localStorage.removeItem("token")
          window.location.href = "/";
        }
        setAuthenticated(valid);
        return;
    };

    checkAuthentication();
  }, []); 

  if (authenticated === null) {
    return null; 
  }

  return (
    <div>
      {authenticated ? <AuthenticatedRoutes /> : <SignRoutes />}
    </div>
  );
};

export default BaseRoutes;
