import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteAdminProductReview, getAdminProductReviews } from '../../../redux/actions/Admin/ReviewAction'
import { ADMIN_DELETE_PRODUCT_REVIEW_RESET } from '../../../redux/constants/Admin/ReviewConstant'
import Loading from '../../layouts/include/Loading'
import MetaData from '../../layouts/include/MetaData'
import Layout from '../layouts/Layout'
import { Rating } from '@mui/material';
const AdminReview = () => {

    const dispatch = useDispatch();


    const { loading, reviews, message, isDeleted } = useSelector((state) => state.adminReview);

    const [productId, setProductId] = useState();


    useEffect(() => {


        if (isDeleted && isDeleted === true) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: ADMIN_DELETE_PRODUCT_REVIEW_RESET });

            dispatch(getAdminProductReviews(productId));
        }

    }, [dispatch, isDeleted, message, productId])


    const filterByProductId = () => {
        dispatch(getAdminProductReviews(productId));
    }

    const deleteProReviews = (review_id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminProductReview(productId, review_id));
        }
    }

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Products" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Products

                        </h5>

                        <div className="input-group mb-5">
                            <input type="text" onChange={(event) => setProductId(event.target.value)} className="form-control" style={{ padding: "10px" }} placeholder="Filter By Product Id" value={productId && productId} />
                            <button onClick={filterByProductId} className='btn btn-sqr'>Search</button>
                        </div>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr className='text-start'>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Comment</th>
                                        <th>Rating</th>
                                        <th className='text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reviews && reviews.map((review, key) => (
                                            <tr className='text-start' key={key}>
                                                <td>
                                                    <img className="img-thumbnail" style={{ width: "50px" }} src={review.image} alt="" />
                                                </td>
                                                <td> {review.name}</td>
                                                <td> {review.comment}</td>
                                                <td>
                                                    <Rating
                                                        size={"medium"}
                                                        value={Math.round(review.rating * 100) / 100}
                                                        readOnly={true}
                                                        precision={0.5} />
                                                </td>

                                                <td className='text-center'>
                                                    <button onClick={() => deleteProReviews(review._id)} className="btn btn-sqr py-2 px-3"><i className="fa fa-trash" aria-hidden="true"></i></button>
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

export default AdminReview
