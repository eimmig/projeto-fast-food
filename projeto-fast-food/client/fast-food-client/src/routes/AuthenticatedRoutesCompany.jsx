import React from "react";
import { Route, Routes } from "react-router-dom";
import {Sidebar} from "../components/Side-Bar/SideBar";
const AuthenticatedRoutesCompany = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Sidebar/>} />
            </Routes>
        </div>
    );
}
export default AuthenticatedRoutesCompany;