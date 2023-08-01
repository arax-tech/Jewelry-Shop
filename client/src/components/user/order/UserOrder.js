import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMyOrders } from '../../../redux/actions/User/OrderAction'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
const UserOrder = () => {

    const dispatch = useDispatch();


    const { loading, orders } = useSelector((state) => state.userOrder);
    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch])


    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="User - Orders" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>Orders</h5>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr className='text-start'>
                                        <th>Ordered Products</th>
                                        <th>Sub Total</th>
                                        <th>Shipping</th>
                                        <th>Grand Total</th>
                                        <th>Status</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders && orders.map((item, key) => (
                                            <tr className='text-start' key={item.product_id}>


                                                <td>
                                                    {
                                                        item.orderedItems.map((product, key) => (
                                                            <>
                                                                {key + 1}. <Link className='text-dark' to={`/product/${product._id}`}>{product.product_name}</Link> <br />
                                                            </>

                                                        ))
                                                    }
                                                </td>


                                                <td> $ {item.subTotal}</td>
                                                <td> $ {item.shippingPrice}</td>
                                                <td>$ {item.grandTotal}</td>
                                                <td>
                                                    {
                                                        item.orderStatus === "Processing" ? <span className='badge bg-primary'>{item.orderStatus}</span> :
                                                            item.orderStatus === "Delivered" ? <span className='badge bg-success'>{item.orderStatus}</span> :
                                                                <span className='badge bg-danger'>{item.orderStatus}</span>
                                                    }
                                                </td>

                                                <td className="text-center">
                                                    <Link to={`/user/order/${item._id}`} className="btn btn-sqr py-2 px-3"><i className="fa fa-eye" aria-hidden="true"></i></Link>
                                                </td>
                                            </tr>

                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </Layout>
    )
}

export default UserOrder
