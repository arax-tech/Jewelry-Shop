import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteAdminCategory, getAdminCategories } from '../../../redux/actions/Admin/CategoryAction'
import { DELETE_CATEGORY_RESET } from '../../../redux/constants/Admin/CategroyConstant'
import Loading from '../../layouts/include/Loading'
import MetaData from '../../layouts/include/MetaData'
import Layout from '../layouts/Layout'
const AdminCategory = () => {
    const dispatch = useDispatch();

    const { loading, categories, message, isDeleted } = useSelector((state) => state.adminCategory);

    const deleteCategroy = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminCategory(id));
        }
    }

    useEffect(() => {
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_CATEGORY_RESET })
        }
        dispatch(getAdminCategories())
    }, [dispatch, isDeleted, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Categories" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Categories
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/category/create">Create</Link>
                            </span>
                        </h5>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Image</th>
                                        <th>Category</th>
                                        <th>Slug</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories?.map((category, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img className='img-thumbnail' style={{ width: "50px" }} src={category.image} alt="" />
                                                </td>
                                                <td>{category.name}</td>
                                                <td>{category.slug}</td>
                                                <td>{category.createAt.substr(0, 10)}</td>
                                                <td>
                                                    <div className='btn-broup custon__group'>
                                                        <Link to={`/admin/category/update/${category._id}`} className="btn btn-sqr">Update</Link>
                                                        <button onClick={() => deleteCategroy(category._id)} className="btn btn-sqr">Delete</button>
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

export default AdminCategory
