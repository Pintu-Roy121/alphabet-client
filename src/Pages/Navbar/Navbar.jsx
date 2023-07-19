import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider/UserProvider';
import { FaShoppingCart, FaLuggageCart } from 'react-icons/fa';

const Navbar = () => {
    const { user, refresh } = useContext(UserContext);
    const [orderList, setOrderList] = useState([])
    const [cartList, setcartList] = useState([])
    const nagigate = useNavigate()


    // Get all Order Product------------------
    useEffect(() => {
        fetch(`https://alphabet-task-server.vercel.app/orderlist/${user?._id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setOrderList(data)
            })
    }, [user?._id, refresh])


    // Get all Cart Product----------------
    useEffect(() => {
        fetch(`https://alphabet-task-server.vercel.app/allcart/${user?._id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setcartList(data)
            })
    }, [user?._id, refresh])

    const handleLogout = () => {
        localStorage.removeItem('userId');
        nagigate('/')
        window.location.reload()
    }
    return (
        <div className='bg-slate-200 shadow-lg'>
            <div className='w-4/5 mx-auto py-4 flex justify-between'>
                <Link to='/' className='text-2xl font-bold '><span className='text-red-700'>A</span>lphabet</Link>
                <div className='flex gap-5 items-center'>
                    <Link to='/orderlist' className="indicator">
                        <span className="indicator-item badge badge-secondary">{orderList?.length}</span>
                        <FaLuggageCart className='text-3xl' />
                    </Link>
                    <Link to='/addtocart' className="indicator">
                        <span className="indicator-item badge badge-secondary">{cartList?.length}</span>
                        <FaShoppingCart className='text-2xl' />
                    </Link>

                    {/* <Link to='/addtocart'>
                        <FaShoppingCart className='text-2xl' />
                    </Link> */}
                    {
                        user ? <button onClick={handleLogout} className='font-bold'>Logout</button>
                            :
                            <Link to='/login' className='font-bold'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;