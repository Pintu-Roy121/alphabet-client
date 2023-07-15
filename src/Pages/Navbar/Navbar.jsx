import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-slate-200 shadow-lg'>
            <div className='w-4/5 mx-auto py-4'>
                <Link to='/' className='text-2xl font-bold '><span className='text-red-700'>A</span>lphabet</Link>
            </div>
        </div>
    );
};

export default Navbar;