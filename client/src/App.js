import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminPassword from './components/admin/AdminPassword'
import AdminProfile from './components/admin/AdminProfile'
import AdminBanner from './components/admin/banner/AdminBanner'
import AdminCreateBanner from './components/admin/banner/AdminCreateBanner'
import AdminUpdateBanner from './components/admin/banner/AdminUpdateBanner'
import AdminCategory from './components/admin/categroy/AdminCategory'
import AdminCreateCategory from './components/admin/categroy/AdminCreateCategory'
import AdminUpdateCategory from './components/admin/categroy/AdminUpdateCategory'
import AdminOrder from './components/admin/order/AdminOrder'
import AdminOrderDetail from './components/admin/order/AdminOrderDetail'
import AdminCreateProduct from './components/admin/product/AdminCreateProduct'
import AdminProduct from './components/admin/product/AdminProduct'
import AdminUpdateProduct from './components/admin/product/AdminUpdateProduct'
import AdminReview from './components/admin/review/AdminReview'
import AdminCreateSlider from './components/admin/slider/AdminCreateSlider'
import AdminSlider from './components/admin/slider/AdminSlider'
import AdminUpdateSlider from './components/admin/slider/AdminUpdateSlider'
import AdminUpdateUser from './components/admin/user/AdminUpdateUser'
import AdminUser from './components/admin/user/AdminUser'
import About from './components/front/About'
import Auth from './components/front/Auth'
import Blog from './components/front/Blog'
import Cart from './components/front/Cart'
import Checkout from './components/front/Checkout'
import Contact from './components/front/Contact'
import ForgotPassword from './components/front/ForgotPassword'
import Home from './components/front/Home'
import PageNotFound from './components/front/PageNotFound'
import ProductDetail from './components/front/ProductDetail'
import ResetPassword from './components/front/ResetPassword'
import Shop from './components/front/Shop'
import Success from './components/front/Success'
import UserDetail from './components/user/order/UserDetail'
import UserOrder from './components/user/order/UserOrder'
import UserDashboard from './components/user/UserDashboard'
import UserPassword from './components/user/UserPassword'
import UserProfile from './components/user/UserProfile'
import Admin from './middlewares/Admin'
import User from './middlewares/User'
import { AuthUser } from './redux/actions/AuthAction'
import Store from './redux/Store'

const App = () => {
    useEffect(() => {
        Store.dispatch(AuthUser());
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/about' element={<About />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='/product/search/:keyword' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<User children={<Checkout />} />} />
            <Route path='/success' element={<Success />} />
            <Route path='/product/:id' element={<ProductDetail />} />


            <Route path='/auth' element={<Auth />} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />

            <Route path='/admin/dashboard' element={<Admin children={<AdminDashboard />} />} />
            <Route path='/admin/profile' element={<Admin children={<AdminProfile />} />} />
            <Route path='/admin/password' element={<Admin children={<AdminPassword />} />} />

            <Route path='/admin/category' element={<Admin children={<AdminCategory />} />} />
            <Route path='/admin/category/create' element={<Admin children={<AdminCreateCategory />} />} />
            <Route path='/admin/category/update/:id' element={<Admin children={<AdminUpdateCategory />} />} />

            <Route path='/admin/product' element={<Admin children={<AdminProduct />} />} />
            <Route path='/admin/product/create' element={<Admin children={<AdminCreateProduct />} />} />
            <Route path='/admin/product/update/:id' element={<Admin children={<AdminUpdateProduct />} />} />
            <Route path='/admin/review' element={<Admin children={<AdminReview />} />} />

            <Route path='/admin/slider' element={<Admin children={<AdminSlider />} />} />
            <Route path='/admin/slider/create' element={<Admin children={<AdminCreateSlider />} />} />
            <Route path='/admin/slider/update/:id' element={<Admin children={<AdminUpdateSlider />} />} />

            <Route path='/admin/banner' element={<Admin children={<AdminBanner />} />} />
            <Route path='/admin/banner/create' element={<Admin children={<AdminCreateBanner />} />} />
            <Route path='/admin/banner/update/:id' element={<Admin children={<AdminUpdateBanner />} />} />

            <Route path='/admin/user' element={<Admin children={<AdminUser />} />} />
            <Route path='/admin/user/update/:id' element={<Admin children={<AdminUpdateUser />} />} />


            <Route path='/admin/order' element={<Admin children={<AdminOrder />} />} />
            <Route path='/admin/order/:id' element={<Admin children={<AdminOrderDetail />} />} />


            <Route path='/user/dashboard' element={<User children={<UserDashboard />} />} />
            <Route path='/user/profile' element={<User children={<UserProfile />} />} />
            <Route path='/user/password' element={<User children={<UserPassword />} />} />
            <Route path='/user/order' element={<User children={<UserOrder />} />} />
            <Route path='/user/order/:id' element={<User children={<UserDetail />} />} />

            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default App
