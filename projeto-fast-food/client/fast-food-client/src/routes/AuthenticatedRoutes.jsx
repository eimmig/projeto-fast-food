import React from "react";
import { Route, Routes } from "react-router-dom";
import Company from "../components/Company/Company/Company";
import MenuPage from './../components/menu/MenuPage';
import { ProfilePage } from "../components/Profile/ProfilePage/ProfilePage";
import { Cart } from "../components/Cart/Cart";
import { ProfileEditUser } from "../components/Profile/ProfileEditUser/ProfileEditUser";
import { ProfileEditAddress } from "../components/Profile/ProfileEditAddress/ProfileEditAddress";
const AuthenticatedRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Company/>} />
                <Route path="/:companyId" element={<MenuPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="cart" element={<Cart />} />
                <Route path="profile/edit/user" element={<ProfileEditUser />} />
                <Route path="profile/address" element={<ProfileEditAddress />} />
            </Routes>
        </div>
    );
}
export default AuthenticatedRoutes;