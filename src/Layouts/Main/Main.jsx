import React from 'react';
import Navbar from '../../Pages/Navbar/Navbar';
import Home from '../../Pages/Home/Home';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;