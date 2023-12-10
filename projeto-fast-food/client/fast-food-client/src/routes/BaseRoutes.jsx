import React, { useEffect, useState } from "react";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import SignRoutes from "./SignRoutes";
import AuthenticatedRoutesCompany from "./AuthenticatedRoutesCompany";
import axios from "axios";
import { toast } from "react-toastify";

const BaseRoutes = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthenticated(0); // NÃO AUTENTICADO
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/user/getValidUser/${token}`);
        const valid = response.data; 
        if (!valid) {
          toast.warn("Sua sessão expirou, faça login novamente.");
          localStorage.removeItem("token");
          window.location.href = "/";
        }

        if (JSON.parse(localStorage.getItem("user")).cpf_cnpj.length === 14) {
          setAuthenticated(1); // AUTENTICADO E EMPRESA
        } else {
          setAuthenticated(2); // AUTENTICADO E CLIENTE
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthenticated(0);
      }
    };

    checkAuthentication();
  }, []); 

  if (authenticated === null) {
    return null; 
  }

  return (
    <div>
      {authenticated === 0 && <SignRoutes />}
      {authenticated === 1 && <AuthenticatedRoutes />}
      {authenticated === 2 && <AuthenticatedRoutesCompany />}
    </div>
  );
};

export default BaseRoutes;
