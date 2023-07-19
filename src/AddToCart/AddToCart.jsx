import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserProvider/UserProvider';
import { FaTrashAlt } from "react-icons/fa";

const AddToCart = () => {
    const { user, setRefresh, refresh } = useContext(UserContext);
    const [cartList, setcartList] = useState([])

    useEffect(() => {
        fetch(`https://alphabet-task-server.vercel.app/allcart/${user?._id}`)
            .then(res => res.json())
            .then(data => {
                setcartList(data)
            })
    }, [user?._id, refresh])


    // Delete Cart------------------
    const hadleCart = (id) => {
        fetch(`https://alphabet-task-server.vercel.app/cart-delete/${id}/${user?._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    setRefresh(!refresh)
                }
            })
    }

    return (
        <div className='w-4/5 mx-auto min-h-screen my-8 pb-16'>
            <div className='flex flex-col gap-5'>
                {
                    cartList?.length ?
                        <div>
                            {
                                cartList?.map((product, i) =>
                                    <div key={i} className='bg-white p-5 shadow-lg flex justify-between gap-5'>
                                        <div className='flex gap-5'>
                                            <img src={product?.img} alt="" className='w-1/6 h-20 object-cover' />
                                            <div>
                                                <h2 className='font-semibold'>{product?.name}</h2>
                                                <p className='flex gap-10 text-success font-semibold'>Category: {product?.category} <span>Size: {product?.size}</span></p>
                                                <p className='font-bold text-accent text-sm'>Shipping: {product?.shipping}</p>
                                                <p className='text-base text-accent font-bold'>Total Price: {product?.price} $</p>
                                                <p className='text-lg font-semibold'>Quantity: {product?.quantity}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center '>
                                            <button onClick={() => hadleCart(product?.p_id)} className='btn btn-error'><FaTrashAlt className='text-xl' /> Delete</button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div className='text-error font-semibold text-center'>NO Product in the Cart</div>
                }
            </div>
        </div>
    );
};

export default AddToCart;