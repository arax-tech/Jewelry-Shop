import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PasswordUpdateFunction, clearErrors } from '../../redux/actions/AuthAction'
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/AuthConstant'
import Loading from '../layouts/include/Loading'
import MetaData from '../layouts/include/MetaData'
import Layout from './layouts/Layout'
const AdminPassword = () => {
    const dispatch = useDispatch();

    const { loading, isUpdated, message, status } = useSelector((state) => state.profile);


    const [password, setPassword] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const inpChnage = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value })
    }

    const updatePasswordFormSubmit = (event) => {
        event.preventDefault();

        if (password.new_password === password.confirm_password) {
            dispatch(PasswordUpdateFunction(password.current_password, password.new_password))
        } else {
            toast.error("Password confirmation does not match...", { theme: "colored" })
        }


    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: UPDATE_PASSWORD_RESET })
            setPassword('');
        }

        if (status && status === 500) {
            toast.error(message, { theme: "colored" })
            dispatch(clearErrors)
        }
    }, [dispatch, isUpdated, message, status])

    return (
        loading ? <Loading /> :
            <Layout>
                <MetaData title="Admin - Password" />
                <div className="col-lg-9 col-md-8">
                    <div className="myaccount-content">
                        <h5>Admin Password</h5>

                        <div className="account-details-form">
                            <form method='post' onSubmit={updatePasswordFormSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="single-input-item">
                                            <label className="required">Current Password</label>
                                            <input type="text" required onChange={inpChnage} name='current_password' value={password.current_password} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">New Password</label>
                                            <input type="text" onChange={inpChnage} name='new_password' value={password.new_password} required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="single-input-item">
                                            <label className="required">Confirm Password</label>
                                            <input type="text" onChange={inpChnage} name='confirm_password' value={password.confirm_password} required />
                                        </div>
                                    </div>

                                </div>



                                <div className="single-input-item">
                                    <button className="btn btn-sqr w-100 p-3">Update Password</button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </Layout >
    )
}

export default AdminPassword
