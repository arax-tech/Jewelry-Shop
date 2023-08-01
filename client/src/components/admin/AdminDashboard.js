import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/include/MetaData'
import Layout from './layouts/Layout'


import { getAdminBanners } from '../../redux/actions/Admin/BannerAction'
import { getAdminSliders } from '../../redux/actions/Admin/SliderAction'
import { getAdminCategories } from '../../redux/actions/Admin/CategoryAction'
import { getAdminProducts } from '../../redux/actions/Admin/ProductAction'
import { getAdminOrders } from '../../redux/actions/Admin/OrderAction'
import { getAdminUsers } from '../../redux/actions/Admin/UserAction'
const AdminDashboard = () => {

    const dispatch = useDispatch();

    const { sliders } = useSelector((state) => state.adminSlider);
    const { banners } = useSelector((state) => state.adminBanner);
    const { products } = useSelector((state) => state.adminProduct);
    const { categories } = useSelector((state) => state.adminCategory);
    const { users } = useSelector((state) => state.adminUser);
    const { orders } = useSelector((state) => state.adminOrder);

    let totalAmount = 0;
    orders && orders.forEach((order) => {
        totalAmount += order.grandTotal;
    })


    useEffect(() => {
        dispatch(getAdminSliders());
        dispatch(getAdminBanners());
        dispatch(getAdminProducts());
        dispatch(getAdminCategories());
        dispatch(getAdminOrders());
        dispatch(getAdminUsers());
    }, [dispatch])


    let outOfStock = 0;
    products && products.forEach((product) => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })


    return (
        <Layout>
            <MetaData title="Admin - Dashboard" />
            <div className="col-lg-9 col-md-8">
                <div className='col-lg-12 col-md-12 col-sm-12 mb-3'>
                    <div className='bg-light shadow-md p-3 text-center'>
                        <h4 className='p-2'>Total Sale</h4>
                        <h6 className='border-top p-2'> $ {totalAmount && totalAmount}</h6>
                    </div>
                </div>




                <div className='row'>
                    <Link className='col-lg-4 col-md-4 col-sm-6 mb-3 text-dark text-decoration-none' to="/admin/user">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Users</h5>
                            <h6 className='border-top pt-2'>{users && users.length}</h6>
                        </div>
                    </Link>

                    <Link className='col-lg-4 col-md-4 col-sm-6 mb-3 text-dark text-decoration-none' to="/admin/category">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Categories</h5>
                            <h6 className='border-top pt-2'>{categories && categories.length}</h6>
                        </div>
                    </Link>

                    <Link className='col-lg-4 col-md-4 col-sm-6 mb-3 text-dark text-decoration-none' to="/admin/product">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Products</h5>
                            <h6 className='border-top pt-2'>{products && products.length}</h6>
                        </div>
                    </Link>
                    <Link className='col-lg-4 col-md-4 col-sm-6 mb-3 text-dark text-decoration-none' to="/admin/slider">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Sliders</h5>
                            <h6 className='border-top pt-2'>{sliders && sliders.length}</h6>
                        </div>
                    </Link>
                    <Link className='col-lg-4 col-md-4 col-sm-6 mb-3 text-dark text-decoration-none' to="/admin/banner">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Banners</h5>
                            <h6 className='border-top pt-2'>{banners && banners.length}</h6>
                        </div>
                    </Link>

                    <Link className='col-lg-4 col-md-4 col-sm-6 mb-3 text-dark text-decoration-none' to="/admin/order">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Orders</h5>
                            <h6 className='border-top pt-2'>{orders && orders.length}</h6>
                        </div>
                    </Link>
                </div>

                <div className='row'>


                    <Link className='col-lg-6 col-md-6 col-sm-12 mb-3 text-dark text-decoration-none' to="/admin/product">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Products In Stock</h5>
                            <h6 className='border-top pt-2'>{products && products.length - outOfStock}</h6>
                        </div>
                    </Link>

                    <Link className='col-lg-6 col-md-6 col-sm-12 mb-3 text-dark text-decoration-none' to="/admin/product">
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h5 className='p-2'>Products Out of Stock</h5>
                            <h6 className='border-top pt-2'>{outOfStock && outOfStock}</h6>
                        </div>
                    </Link>
                </div>

            </div>
        </Layout>
    )
}

export default AdminDashboard
