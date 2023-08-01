import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { singleAdminOrder } from '../../../redux/actions/Admin/OrderAction'
const AdminOrderDetail = () => {

    const dispatch = useDispatch();
    const { id } = useParams();


    const { loading, order } = useSelector((state) => state.adminOrder);
    useEffect(() => {
        dispatch(singleAdminOrder(id));
    }, [dispatch, id])


    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Order Detail" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>Order Detail</h5>


                        <div className="row ">
                            <div className="col-md-5">
                                <p className='bg-light px-3 py-3' style={{ fontSize: "20px" }}>Shipping Address</p>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{order?.user_id.name}</td>
                                        </tr>

                                        <tr>
                                            <td>Email</td>
                                            <td>{order?.user_id.email}</td>
                                        </tr>

                                        <tr>
                                            <td>Country</td>
                                            <td>{order?.shippingInfo.country}</td>
                                        </tr>


                                        <tr>
                                            <td>State</td>
                                            <td>{order?.shippingInfo.state}</td>
                                        </tr>

                                        <tr>
                                            <td>City</td>
                                            <td>{order?.shippingInfo.city}</td>
                                        </tr>




                                        <tr>
                                            <td>Address</td>
                                            <td>{order?.shippingInfo.address}</td>
                                        </tr>


                                        <tr>
                                            <td>Phone</td>
                                            <td>{order?.shippingInfo.phone}</td>
                                        </tr>

                                        <tr>
                                            <td>Sub Total</td>
                                            <td>${order?.subTotal}</td>
                                        </tr>



                                        <tr>
                                            <td>Shipping Charges</td>
                                            <td>${order?.shippingPrice}</td>
                                        </tr>

                                        <tr>
                                            <td>Payment Metdod</td>
                                            <td>{order?.paymentInfo.type}</td>
                                        </tr>




                                        <tr>
                                            <td>Grand Total</td>
                                            <td>${order?.grandTotal}</td>
                                        </tr>


                                        <tr>
                                            <td>Status</td>
                                            <td>
                                                {
                                                    order?.orderStatus === "Processing" ? <span className='badge bg-primary'>{order?.orderStatus}</span> :
                                                        order?.orderStatus === "Delivered" ? <span className='badge bg-success'>{order?.orderStatus}</span> :
                                                            <span className='badge bg-dangers'>{order?.orderStatus}</span>
                                                }
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>


                            <div className="col-md-7">
                                <p className='bg-light px-3 py-3' style={{ fontSize: "20px" }}>Ordered Items</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Image</td>
                                            <td>Name</td>
                                            <td>Price</td>
                                            <td>Color</td>
                                            <td>Size</td>
                                            <td>Quantity</td>
                                            <td>Total</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            order?.orderedItems.map((product, index) => (
                                                <tr key={index}>
                                                    <td>

                                                        <img className="img-thumbnail" style={{ width: "40px" }} src={product.product_image} alt="" />

                                                    </td>
                                                    <td>{product.product_name.substr(0, 10)}{product.product_name.length > 9 && "..."}</td>
                                                    <td>$ {product.product_price}</td>
                                                    <td>
                                                        <div className="color-option">
                                                            <ul className="color-categories">
                                                                <li>
                                                                    <Link to="" className={product.product_color}></Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                    <td>{product.product_size}</td>
                                                    <td>{product.product_quantity}</td>
                                                    <td>$ {product.product_price * product.product_quantity}</td>
                                                </tr>
                                            ))
                                        }






                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-12 mt-3">
                                <p className='bg-light px-3 py-3' style={{ fontSize: "20px" }}>Payment Info</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Type</td>
                                            <td>Amount</td>
                                            <td>Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{order?.paymentInfo.id}</td>
                                            <td>{order?.paymentInfo.type}</td>
                                            <td>${order?.paymentInfo.amount}</td>
                                            <td>{order?.paymentInfo.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>




                        </div>


                    </div>


                </div>
            </Layout>
    )
}

export default AdminOrderDetail
