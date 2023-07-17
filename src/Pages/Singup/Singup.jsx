import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

const Singup = () => {
    const [showPassword, setShowPassword] = useState(true);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data)

    }

    // Password Show / hidden-----------------------
    const handlePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='min-h-screen '>
            <div className='w-2/4 mx-auto py-10'>
                <div className='p-10 border rounded-md'>
                    <Link to='/' className='text-xl font-semibold flex gap-2 items-center'><FaArrowLeft /> Back</Link>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-3xl font-bold text-sky'>Signup</h2>
                    </div>

                    <div className='w-4/5 mx-auto mt-5'>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <input {...register("name", { required: 'Enter You Name' })} type="text" placeholder='Enter Your Name' className='py-2 px-3 border border-[#a7a7a7] rounded-md w-full mt-5' />
                            {errors.name && (<span className="text-error">{errors.name.message}</span>)}
                            <input {...register("email", { required: true })} type="email" placeholder='Email' className='py-2 px-3 border border-[#a7a7a7] rounded-md w-full mt-5' />
                            <div className="relative">
                                {showPassword ? (
                                    <FaEye
                                        onClick={() => handlePassword()}
                                        className="absolute right-4 top-8 text-lg cursor-pointer"
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={() => handlePassword()}
                                        className="absolute right-4 top-8 text-lg cursor-pointer"
                                    />
                                )}

                                <input {...register("password", { required: true })} type={showPassword ? 'password' : 'text'} placeholder='Password' className='py-2 px-3 border border-[#a7a7a7] rounded-md w-full mt-5' />
                            </div>
                            <input type="submit" value='Signup' className='py-2 px-3 bg-success rounded-md w-full mt-5 font-semibold ' />
                        </form>

                        <button className='text-sky font-medium mt-2 hover:text-success duration-300'>Forgot password?</button>
                        <p className='text-center font-semibold mt-8'>Don't have an account? <Link to='/login' className='text-success font-semibold hover:text-accent duration-300'>Login</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Singup;