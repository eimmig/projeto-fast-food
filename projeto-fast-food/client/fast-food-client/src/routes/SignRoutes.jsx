import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticationPage from "../components/Login-Register/AuthenticationPage";
import PasswordResetPage from "../components/Login-Register/PasswordResetPage";

const SignRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/login" element={<AuthenticationPage />} />
                <Route path="/signup" element={<AuthenticationPage />} />
                <Route path="/reset" element={<PasswordResetPage />} />
            </Routes>
        </div>
    );
}
export default SignRoutes;