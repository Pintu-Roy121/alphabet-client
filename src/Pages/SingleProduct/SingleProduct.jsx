import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserProvider/UserProvider';

const SingleProduct = () => {
    const [product, setProduct] = useState();
    const [quantiy, setQuantity] = useState(1);
    const [updatePrice, setUpdatePrice] = useState(product?.price)
    const [size, setSize] = useState(40);
    const { user, setRefresh, refresh } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://alphabet-task-server.vercel.app/product/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0)
                // console.log(data);
                setProduct(data);
            })
    }, [id])

    const quantityDecrese = () => {
        if (quantiy <= 1) {
            setQuantity(1)
            // setUpdatePrice(updatePrice)
            return;
        }
        setQuantity(quantiy - 1)
        // setUpdatePrice(updatePrice * quantiy)
    }

    const quantityIncrease = () => {
        setQuantity(quantiy + 1)
        // setUpdatePrice(updatePrice * quantiy)
    }

    const handleSize = (size) => {
        setSize(size)
        if (size === 40) {
            setUpdatePrice(product?.price)
        }
        else if (size === 41) {
            setUpdatePrice(product?.price + 20)
        }
        else if (size === 42) {
            setUpdatePrice(product?.price + 40)
        }
        else if (size === 43) {
            setUpdatePrice(product?.price + 50)
        }
        else if (size >= 44) {
            setUpdatePrice(product?.price + 60)
        }

    }

    const updateProduct = {
        category: product?.category,
        img: product?.img,
        name: product?.name,
        price: updatePrice ? updatePrice * quantiy : product?.price * quantiy,
        productPrice: product?.price,
        quantity: quantiy,
        ratings: product?.ratings,
        ratingsCount: product?.ratingsCount,
        seller: product?.seller,
        shipping: quantiy >= 2 ? product?.shipping * 2 : product?.shipping,
        size: size && size,
        stock: product?.stock - quantiy,
        _id: product?._id
    }
    const handleOrder = () => {
        navigate('/checkout')
        localStorage.setItem('product', JSON.stringify(updateProduct))
    }

    const handleCart = () => {
        const cartProduct = {
            category: product?.category,
            img: product?.img,
            name: product?.name,
            price: product?.price,
            quantity: quantiy,
            ratings: product?.ratings,
            ratingsCount: product?.ratingsCount,
            seller: product?.seller,
            shipping: product?.shipping,
            size: size && size,
            stock: product?.stock,
            p_id: product?._id,
            u_id: user?._id
        }
        if (user) {
            fetch('https://alphabet-task-server.vercel.app/addtocart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartProduct)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.acknowledged) {
                        setRefresh(!refresh)
                        navigate('/addtocart')
                    }
                })
            return
        }
        navigate('/addtocart')
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
                        <p className='text-2xl font-semibold mt-5'>Price: {updatePrice ? updatePrice * quantiy : product?.price * quantiy} $</p>

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
                                        <button key={i} onClick={() => handleSize(size)} className='py-1 px-2 hover:border-orange-700 focus:border-orange-700 text-lg border'>{size}</button>
                                    )
                                }
                            </div>
                        </div>

                        <div className='flex gap-2 mt-10'>
                            <button onClick={handleOrder} className='btn btn-wide btn-success'>Buy Now</button>
                            <button onClick={handleCart} className='btn btn-wide btn-secondary'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;