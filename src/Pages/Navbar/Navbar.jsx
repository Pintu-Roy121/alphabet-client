import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider/UserProvider';

const Navbar = () => {
    const { user } = useContext(UserContext);
    const nagigate = useNavigate()


    const handleLogout = () => {
        localStorage.removeItem('userId');
        nagigate('/')
        window.location.reload()
    }
    return (
        <div className='bg-slate-200 shadow-lg'>
            <div className='w-4/5 mx-auto py-4 flex justify-between'>
                <Link to='/' className='text-2xl font-bold '><span className='text-red-700'>A</span>lphabet</Link>
                {
                    user ? <button onClick={handleLogout} className='font-bold'>Logout</button>
                        :
                        <Link to='/login' className='font-bold'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;