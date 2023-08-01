import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordFunction } from '../../redux/actions/AuthAction'
import { toast } from 'react-toastify'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'
import Loading from '../layouts/include/Loading'
import { FORGOT_PASSWORD_RESET } from '../../redux/constants/AuthConstant'

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { loading, status, message } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState('')


    const forgotPasswordFormSubmit = (event) => {
        event.preventDefault();
        dispatch(ForgotPasswordFunction(email))
    }



    useEffect(() => {
        if (status && status === 200) {
            toast.success(message, { theme: "colored" })
            navigate("/")
            dispatch({ type: FORGOT_PASSWORD_RESET })
        }

        if (status && status === 500) {
            toast.error(message, { theme: "colored" })
        }

    }, [dispatch, navigate, message, status])

    return (
        loading ? <Loading /> :
            <App>
                <MetaData title="Forgot Password" />
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
                                            <h5>Forgot Password</h5>
                                            <form onSubmit={forgotPasswordFormSubmit}>
                                                <div className="single-input-item">
                                                    <input type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                                                </div>


                                                <div className="single-input-item">
                                                    <button type='submit' className="btn btn-sqr w-100">Get Reset Passowrd Email</button>
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

export default ForgotPassword
