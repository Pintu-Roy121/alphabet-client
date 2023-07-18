import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProducts(data);
            })
    }, [])
    return (
        <div className='w-4/5 mx-auto mt-5 min-h-screen'>
            <div className='grid grid-cols-4 gap-5'>
                {
                    products?.map((product, i) =>
                        <div key={i} className='border rounded-sm'>
                            <img src={product?.img} alt="" />
                            <div className='p-2'>
                                <h2 className='text-md font-semibold'>{product?.name}</h2>
                                <div className='flex justify-between my-2'>
                                    <h3 className='font-bold'>Price: {product?.price}$</h3>
                                    <h3 className='font-bold'>Brand: {product?.seller}</h3>
                                </div>
                                <Link to={`/product/${product?._id}`} className='btn btn-success btn-sm justify-end'>View Details</Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;