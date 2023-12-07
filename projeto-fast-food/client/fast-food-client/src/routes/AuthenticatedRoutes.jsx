import React from "react";
import { Route, Routes } from "react-router-dom";
import Company from "../components/Company/Company/Company";
import MenuPage from './../components/menu/MenuPage';
const AuthenticatedRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Company/>} />
                <Route path="/:companyId" element={<MenuPage />} />
            </Routes>
        </div>
    );
}
export default AuthenticatedRoutes;