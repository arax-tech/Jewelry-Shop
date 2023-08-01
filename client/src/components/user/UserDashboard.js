import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/include/MetaData'
import Loading from '../layouts/include/Loading'
import { getMyOrders } from '../../redux/actions/User/OrderAction'
import Layout from './layouts/Layout'
const UserDashboard = () => {
    const dispatch = useDispatch();


    const { loading, orders } = useSelector((state) => state.userOrder);
    let myPurchase = 0;
    orders && orders.forEach((order) => {
        myPurchase += order.grandTotal;
    })

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch])
    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="User - Dashboard" />
                <div className="col-lg-9 col-md-8">
                    <div className='col-lg-12 col-md-12 col-sm-12 mb-3'>
                        <div className='bg-light shadow-md p-3 text-center'>
                            <h4 className='p-2'>My Purchase</h4>
                            <h6 className='border-top p-2'> $ {myPurchase}</h6>
                        </div>
                    </div>


                    <div className='row'>


                        <Link className='col-lg-3 col-md-3 col-sm-6 mb-3' to="/user/order">
                            <div className='bg-light shadow-md p-3 text-center'>
                                <h5 className='p-2'>My Orders</h5>
                                <h6 className='border-top pt-2'>{orders && orders.length}</h6>
                            </div>
                        </Link>
                    </div>



                </div>
            </Layout>
    )
}

export default UserDashboard
