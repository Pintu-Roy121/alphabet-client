import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserContext } from '../../contexts/UserProvider/UserProvider';

const Login = () => {
    const [showPassword, setShowPassword] = useState(true);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { setUserId, setUser } = useContext(UserContext);
    const [error, setError] = useState()
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (user) {
        navigate(from, { replace: true });
        return
    }

    const onSubmit = (data) => {
        fetch('https://alphabet-task-server.vercel.app/userlogin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    setUser(data?.userDetails)
                    setUserId(data?.userDetails?._id)
                    localStorage.setItem('userId', data?.userDetails?._id)
                    navigate(from, { replace: true });
                }
                setError(data?.message)
            })

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
                        <h2 className='text-3xl font-bold text-sky'>Login</h2>
                    </div>

                    <div className='w-4/5 mx-auto mt-5'>
                        <form onSubmit={handleSubmit(onSubmit)} >
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
                            <input type="submit" value='Login' className='py-2 px-3 bg-success rounded-md w-full mt-5 font-semibold ' />
                        </form>
                        <p className='text-red-600 font-medium mt-2  duration-300'>{error && error}</p>
                        {/* <button className='text-sky font-medium mt-2 hover:text-success duration-300'>Forgot password?</button> */}
                        <p className='text-center font-semibold mt-8'>Don't have an account? <Link to='/signup' className='text-success font-semibold hover:text-accent duration-300'> Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;