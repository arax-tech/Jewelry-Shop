import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../layouts/include/MetaData'
import Loading from '../../layouts/include/Loading'
import Layout from '../layouts/Layout'
import { toast } from 'react-toastify'
import { UPDATE_USER_RESET } from '../../../redux/constants/Admin/UserConstant'
import { updateAdminUser } from '../../../redux/actions/Admin/UserAction'
const AdminUpdateUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, isUpdated, message } = useSelector((state) => state.adminUser);

    const [role, setRole] = useState();

    const updateUserRole = () => {
        dispatch(updateAdminUser(id, role));
    }



    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" })
            navigate("/admin/user")
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [dispatch, navigate, isUpdated, message]);

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Update User" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>
                            Update User
                            <span className='float-end'>
                                <Link style={{ marginTop: "-20px" }} className='btn btn-sqr' to="/admin/user">Back</Link>
                            </span>
                        </h5>

                        <div className="account-details-form">
                            <form method='POST' onSubmit={updateUserRole}>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="single-input-item">
                                            <label className="required">Title</label>
                                            <select name='title' onChange={e => setRole(e.target.value)} required>
                                                <option selected disabled value="">Choose...</option>
                                                <option value="Admin">Admin</option>
                                                <option value="User">User</option>
                                            </select>
                                        </div>
                                    </div>


                                </div>



                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Update User</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div >
            </Layout >
    )
}

export default AdminUpdateUser
