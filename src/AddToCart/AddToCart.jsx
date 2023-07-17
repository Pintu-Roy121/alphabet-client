import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserProvider/UserProvider';

const AddToCart = () => {
    const { user } = useContext(UserContext);
    const [cartList, setcartList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/allcart/${user?._id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setcartList(data)
            })
    }, [user?._id])


    return (
        <div className='w-4/5 mx-auto min-h-screen my-8'>
            <div className='flex flex-col gap-5'>
                {
                    cartList?.map((product, i) =>
                        <div className=' bg-white p-5 shadow-lg flex gap-5'>
                            <img src={product?.img} alt="" className='w-1/6 h-20 object-cover' />
                            <div>
                                <h2 className='font-semibold'>{product?.name}</h2>
                                <p className='flex gap-10 text-success font-semibold'>Category: {product?.category} <span>Size: {product?.size}</span></p>
                                <p className='font-bold text-accent text-sm'>Shipping: {product?.shipping}</p>
                                <p className='text-base text-accent font-bold'>Total Price: {product?.price} $</p>
                                <p className='text-lg font-semibold'>Quantity: {product?.quantity}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AddToCart;