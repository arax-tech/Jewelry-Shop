import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { deleteAdminOrder, getAdminOrders, updateAdminOrder } from '../../../redux/actions/Admin/OrderAction'
import Modal from 'react-bootstrap/Modal';
import { ADMIN_DELETE_ORDER_RESET, ADMIN_UPDATE_ORDER_RESET } from '../../../redux/constants/Admin/OrderConstant'
import { toast } from 'react-toastify'
const AdminOrder = () => {

    const dispatch = useDispatch();


    const { loading, orders, isUpdated, isDeleted, message } = useSelector((state) => state.adminOrder);

    const deleteOrder = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminOrder(id));
        }
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [status, setStatus] = useState();

    const updateOrderStatus = (id) => {
        dispatch(updateAdminOrder(id, status));
        setShow(false);

    }

    useEffect(() => {

        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" })
            dispatch({ type: ADMIN_DELETE_ORDER_RESET })
        }

        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: ADMIN_UPDATE_ORDER_RESET });

        }

        dispatch(getAdminOrders());
    }, [dispatch, isDeleted, isUpdated, message])


    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Orders" />
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
                                                    <Link to={`/admin/order/${item._id}`} className="btn btn-sqr py-2 px-3"><i className="fa fa-eye" aria-hidden="true"></i></Link>

                                                    <div className='btn-group'>

                                                        {
                                                            item.orderStatus && item.orderStatus !== "Delivered" && (
                                                                <>
                                                                    <button className="btn btn-sqr btn-sm py-2 px-3" onClick={handleShow}><i className="fa fa-edit" aria-hidden="true"></i></button>


                                                                    <Modal
                                                                        show={show}
                                                                        onHide={handleClose}
                                                                        backdrop="static"
                                                                        keyboard={false}
                                                                    >
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title>Update Order</Modal.Title>
                                                                        </Modal.Header>
                                                                        <Modal.Body>
                                                                            <div className="row">

                                                                                <div className="col-md-12  col-sm-12 mb-3">
                                                                                    <div className="form-group">
                                                                                        <label>State</label>
                                                                                        <select className="form-control" value={status} a onChange={(event) => setStatus(event.target.value)}>
                                                                                            <option value="Processing">Processing</option>
                                                                                            <option value="Delivered">Delivered</option>
                                                                                            <option value="Cancelled">Cancelled</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>


                                                                                <div className="col-md-12">
                                                                                    <button onClick={() => updateOrderStatus(item._id)} className="btn btn-sqr w-100" >Update Order Status</button>
                                                                                </div>


                                                                            </div>
                                                                        </Modal.Body>

                                                                    </Modal>
                                                                </>
                                                            )

                                                        }
                                                        <button onClick={() => deleteOrder(item._id)} className="btn btn-sqr btn-sm py-2 px-3"><i className="fa fa-trash" aria-hidden="true"></i></button>
                                                    </div>
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

export default AdminOrder
