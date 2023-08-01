import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteAdminProduct, getAdminProducts } from '../../../redux/actions/Admin/ProductAction'
import { DELETE_PRODUCT_RESET } from '../../../redux/constants/Admin/ProductConstant'
import Loading from '../../layouts/include/Loading'
import MetaData from '../../layouts/include/MetaData'
import Layout from '../layouts/Layout'
const AdminProduct = () => {
    const dispatch = useDispatch();

    const { loading, products, message, isDeleted } = useSelector((state) => state.adminProduct);

    const deleteProduct = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminProduct(id));
        }
    }
    useEffect(() => {
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts())
    }, [dispatch, isDeleted, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Products" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Products
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/product/create">Create</Link>
                            </span>
                        </h5>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr className='text-start'>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Created At</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map((product, index) => (
                                            <tr className='text-start' key={index}>
                                                <td>
                                                    <img className='img-thumbnail' style={{ width: "50px" }} src={product.images[0] && product.images[0].image} alt="" />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.category && product.category.name}</td>
                                                <td>$ {product.price}</td>
                                                <td>{product.stock}</td>
                                                <td>{product.createdAt.substr(0, 10)}</td>
                                                <td className='text-center'>
                                                    <div className='btn-broup custon__group'>
                                                        <Link to={`/admin/product/update/${product._id}`} className="btn btn-sqr">Update</Link>
                                                        <button onClick={() => deleteProduct(product._id)} className="btn btn-sqr">Delete</button>
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

export default AdminProduct
