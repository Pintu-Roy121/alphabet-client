import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home";
import SingleProduct from "../../Pages/SingleProduct/SingleProduct";
import Login from "../../Pages/Login/Login";
import Singup from "../../Pages/Singup/Singup";
import CheckOut from "../../CheckOut/CheckOut";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import OrderPage from "../../Pages/OrderPage/OrderPage";
import AddToCart from "../../AddToCart/AddToCart";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/product/:id',
                element: <SingleProduct></SingleProduct>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Singup></Singup>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
            },
            {
                path: '/orderlist',
                element: <OrderPage></OrderPage>
            },
            {
                path: '/addtocart',
                element: <PrivateRoute><AddToCart></AddToCart></PrivateRoute>
            }
        ]
    }
])