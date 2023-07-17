import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const CheckOut = () => {
    const [product, setProduct] = useState()

    useEffect(() => {
        const productJson = localStorage.getItem('product')
        const product = JSON.parse(productJson)
        // console.log(product);
        setProduct(product)
    }, [])
    return (
        <div className='w-4/5 mx-auto mt-8 min-h-screen'>
            <Link to={`/product/${product?._id}`} className='text-lg font-semibold flex gap-1 items-center'> <FaAngleDoubleLeft /> Back</Link>
            <div className='w-full flex gap-5'>
                <div className='w-2/3 bg-white p-5 shadow-lg flex gap-5'>
                    <img src={product?.img} alt="" className='w-1/6 h-20 object-cover' />
                    <div>
                        <h2 className='font-semibold'>{product?.name}</h2>
                        <p>Category: {product?.category}</p>
                        <p className='text-red-700 text-sm'>Only {product?.stock} Items in Stock</p>
                        <p className='text-base text-accent font-bold'>Total Price: {product?.price} $</p>
                        <p className='text-lg font-semibold'>Quantity: {product?.quantity}</p>
                    </div>
                </div>
                <div className='w-1/3 bg-white p-5 shadow-lg'>
                    <h2 className='font-semibold'>Order Summery</h2>
                    <hr className='py-2' />
                    <div className='flex justify-between font-semibold'>
                        <p>Product Price: </p>
                        <span>{product?.productPrice} $</span>
                    </div>
                    <div className='flex justify-between font-semibold'>
                        <p>Total Price: </p>
                        <span>{product?.price} $</span>
                    </div>
                    <div className='flex justify-between font-semibold'>
                        <p>Delivery Fee: </p>
                        <span>{product?.shipping} $</span>
                    </div>
                    <hr className='py-2' />
                    <div className='flex justify-between font-semibold'>
                        <p>Total Payment: </p>
                        <span>{product?.price + product?.shipping} $</span>
                    </div>
                    <button className='bg-orange-600 hover:bg-orange-500 font-semibold text-white py-2 my-4 w-full'>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;