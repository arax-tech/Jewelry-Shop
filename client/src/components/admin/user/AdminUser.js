import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteAdminUser, getAdminUsers } from '../../../redux/actions/Admin/UserAction'
import { DELETE_USER_RESET } from '../../../redux/constants/Admin/UserConstant'
import Loading from '../../layouts/include/Loading'
import MetaData from '../../layouts/include/MetaData'
import Layout from '../layouts/Layout'

const AdminUser = () => {
    const dispatch = useDispatch();

    const { loading, users, message, isDeleted } = useSelector((state) => state.adminUser);

    const deleteUser = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            dispatch(deleteAdminUser(id));
        }
    }

    useEffect(() => {
        if (isDeleted && isDeleted === true) {
            toast.error(message, { theme: "colored" });
            dispatch({ type: DELETE_USER_RESET })
        }
        dispatch(getAdminUsers())
    }, [dispatch, isDeleted, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Users" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Users
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/user/create">Create</Link>
                            </span>
                        </h5>

                        <div className="myaccount-table table-responsive text-center">
                            <table className="table table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map((user, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img className='img-thumbnail' style={{ width: "50px" }} src={user.image ? user.image : "/assets/placeholder.jpg"} alt="" />
                                                </td>
                                                <td>{user.name.split("<span>")}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    {
                                                        user.role === "User" ? <span className='badge bg-primary'>{user.role}</span> :
                                                            <span className='badge bg-success'>{user.role}</span>
                                                    }</td>
                                                <td>{user.createAt.substr(0, 10)}</td>
                                                <td>
                                                    <div className='btn-broup custon__group'>
                                                        <Link to={`/admin/user/update/${user._id}`} className="btn btn-sqr">Update</Link>
                                                        <button onClick={() => deleteUser(user._id)} className="btn btn-sqr">Delete</button>
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

export default AdminUser
