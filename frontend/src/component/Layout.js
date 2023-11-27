import React from 'react';
import { Outlet } from "react-router-dom"
import Navbar from "./navbar"
const Layout = () => {
    return (
        <main className="App">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Layout
