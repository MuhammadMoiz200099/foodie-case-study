import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../protectedRoutes/protectedRoutes";
//containers
import Dashboard from '../containers/dashboard/dashboard';
import LoginContainer from '../containers/login/login';
import SignupContainer from '../containers/signup/signup';
//components
import NotFound from "../components/notfound/notfound";
import BaseComponent from '../components/baseLayout/baseLayout';
import MyOrder from "../containers/myOrder/myOrder";
import MyDishes from "../containers/myDishes/myDishes";
import CartComponent from "../containers/cart/cart";
import PaymentComponent from "../containers/payment/payment";
import Chefs from "../containers/chefs/chefs";
import ChefsDetails from "../containers/chefs/ChefsDetails/ChefsDetails";

const Navigation = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <Routes>
            <Route path="/food" element={<BaseComponent />}>
                <Route index path="home" element={<ProtectedRoute isLoggedIn={user}> <Dashboard /></ProtectedRoute>} />
                <Route index path="my-order" element={<ProtectedRoute isLoggedIn={user}> <MyOrder /></ProtectedRoute>} />
                <Route index path="dishes" element={<ProtectedRoute isLoggedIn={user}> <MyDishes /></ProtectedRoute>} />
                <Route index path="cart" element={<ProtectedRoute isLoggedIn={user}> <CartComponent /></ProtectedRoute>} />
                <Route index path="payment" element={<ProtectedRoute isLoggedIn={user}> <PaymentComponent /></ProtectedRoute>} />
                <Route index path="chefs" element={<ProtectedRoute isLoggedIn={user}> <Chefs /></ProtectedRoute>} />
                <Route index path="chefs/:id" element={<ProtectedRoute isLoggedIn={user}> <ChefsDetails /></ProtectedRoute>} />
            </Route>
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/signup" element={<SignupContainer />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/food/home" />} />
            <Route path="/food" element={<Navigate to="/food/home" />} />
        </Routes>
    )
}

export default Navigation;