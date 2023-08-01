import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RestPasswordFunction } from '../../redux/actions/AuthAction'
import { toast } from 'react-toastify'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'
import Loading from '../layouts/include/Loading'
import { RESET_PASSWORD_RESET } from '../../redux/constants/AuthConstant'

const ResetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


    const { loading, status, message } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState({
        new_password: "",
        confirm_password: ""
    });
    const inpChnage = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value });
    }
    const token = params.token;


    const passwordResetFormSubmit = (event) => {
        event.preventDefault();
        if (password.new_password === password.confirm_password) {
            dispatch(RestPasswordFunction(token, password.new_password));
        } else {
            toast.error("Password confirmation does not match...", { theme: "colored" })
        }

    }



    useEffect(() => {
        if (status && status === 200) {
            toast.success(message, { theme: "colored" })
            dispatch({ type: RESET_PASSWORD_RESET })
            navigate("/")
        }

        if (status && status === 500) {
            toast.error(message, { theme: "colored" })
        }

    }, [dispatch, navigate, message, status])

    return (
        loading ? <Loading /> :
            <App>
                <MetaData title="Reset Password" />
                <main>
                    <div className="breadcrumb-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadcrumb-wrap">
                                        <nav aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html"><i className="fa fa-home"></i></a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Passowrd / Forgot</li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="login-register-wrapper section-padding">
                        <div className="container">
                            <div className="member-area-from-wrap">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <div className="login-reg-form-wrap">
                                            <h5>Reset Password</h5>
                                            <form onSubmit={passwordResetFormSubmit}>
                                                <div className="single-input-item">
                                                    <input type='text' onChange={inpChnage} value={password.new_password} name="new_password" placeholder="New Password" required />
                                                </div>
                                                <div className="single-input-item">
                                                    <input type='text' onChange={inpChnage} value={password.confirm_password} name="confirm_password" placeholder="Confirm Password" required />
                                                </div>


                                                <div className="single-input-item">
                                                    <button type='submit' className="btn btn-sqr w-100">Reset Passowrd</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </App>
    )
}

export default ResetPassword
