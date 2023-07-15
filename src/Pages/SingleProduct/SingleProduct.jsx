import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
    const [product, setProduct] = useState();
    const [quantiy, setQuantity] = useState(1)
    const { id } = useParams()
    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0)
                console.log(data);
                setProduct(data);
            })
    }, [id])

    const quantityDecrese = () => {
        if (quantiy <= 1) {
            setQuantity(1)
            return;
        }
        setQuantity(quantiy - 1)
    }

    const quantityIncrease = () => {
        setQuantity(quantiy + 1)
    }

    const sizes = [40, 41, 42, 43, 44, 45]

    return (
        <div className='w-4/5 mx-auto mt-5 min-h-screen' >
            <div className='flex gap-5 bg-white p-5 shadow-lg'>
                <div className='flex gap-5'>
                    <div className='w-1/4 '>
                        <img src={product?.img} alt="" className='w-full object-cover' />
                    </div>
                    <div className=''>
                        <h2 className='text-2xl font-bold'>{product?.name}</h2>
                        <h2 className='text-lg font-semibold'>{product?.category}</h2>
                        <div>
                            <h2>Rating:{'  '} {product?.ratings}</h2>
                        </div>
                        <p className='text-2xl font-semibold mt-5'>Price: {product?.price} $</p>

                        <div className='flex gap-4 items-center mt-5'>
                            <p className='text-xl font-semibold'>Quantity:</p>
                            <div className='flex items-center gap-5'>
                                <button onClick={quantityDecrese} className='text-3xl bg-slate-300 px-4 py-2'>-</button>
                                <h2 className='text-2xl font-semibold'>{quantiy}</h2>
                                <button onClick={quantityIncrease} className='text-3xl bg-slate-300 px-4 py-2'>+</button>
                            </div>
                        </div>
                        <hr className='w-full  my-3' />
                        <div className='flex gap-5'>
                            <h2>Size:</h2>
                            <div className='w-full grid grid-cols-4 gap-3'>
                                {
                                    sizes?.map((size, i) =>
                                        <button className='py-1 px-2 hover:border-orange-700 focus:border-orange-700 text-lg border'>{size}</button>
                                    )
                                }
                            </div>
                        </div>

                        <div className='flex gap-2 mt-10'>
                            <button className='btn btn-wide btn-success'>Buy Now</button>
                            <button className='btn btn-wide btn-secondary'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;