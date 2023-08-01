import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthUser, LoginFunction, RegisterFunction } from '../../redux/actions/AuthAction'
import { toast } from 'react-toastify'
import App from '../layouts/App'
import { LOGIN_RESET, REGISTER_RESET } from '../../redux/constants/AuthConstant'
import MetaData from '../layouts/include/MetaData'
import Loading from '../layouts/include/Loading'

const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()





    const { user, loading, isAuthenticated, status, message, isLoggedIn, isRegistered } = useSelector((state) => state.auth);

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const loginInpChnage = (event) => {
        setLogin({ ...login, [event.target.name]: event.target.value })

    }
    const registerInpChnage = (event) => {
        setRegister({ ...register, [event.target.name]: event.target.value })

    }

    const loginFormSubmit = (event) => {
        event.preventDefault();
        dispatch(LoginFunction(login.email, login.password))
    }

    const registerFormSubmit = (event) => {
        event.preventDefault();
        if (register.password === register.confirm_password) {
            dispatch(RegisterFunction(register.name, register.email, register.password))
        } else {
            toast.error("Password confirmation does not match...", { theme: "colored" })
        }
    }


    let redirect = "";
    if (user && user.role === "User") {
        redirect = location.search ? location.search.split("=")[1] : "/user/dashboard";
    } else {
        redirect = "/admin/dashboard";
    }


    useEffect(() => {
        if (isAuthenticated && isAuthenticated === true) {
            navigate(redirect)
        }
        if (isLoggedIn && isLoggedIn === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: LOGIN_RESET });
            localStorage.clear();
            localStorage.setItem("role", user.role.toLowerCase());
            dispatch(AuthUser());
            navigate(redirect)
        }
        if (isRegistered && isRegistered === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: REGISTER_RESET });
            localStorage.clear();
            localStorage.setItem("role", user.role.toLowerCase());
            dispatch(AuthUser());
            navigate(redirect)
        }

        if (status && status === 500) {
            toast.error(message, { theme: "colored" })
        }


    }, [dispatch, navigate, isAuthenticated, isLoggedIn, isRegistered, message, user, status, redirect])

    return (
        loading ? <Loading /> :
            <App>
                <MetaData title="Login / Register" />
                <main>
                    <div className="breadcrumb-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadcrumb-wrap">
                                        <nav aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><a href="index.html"><i className="fa fa-home"></i></a></li>
                                                <li className="breadcrumb-item active" aria-current="page">Login OR Register</li>
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
                                    <div className="col-lg-6">
                                        <div className="login-reg-form-wrap">
                                            <h5>Sign In</h5>
                                            <form onSubmit={loginFormSubmit}>
                                                <div className="single-input-item">
                                                    <input type="email" name='email' value={login.email} onChange={loginInpChnage} placeholder="Email" required />
                                                </div>
                                                <div className="single-input-item">
                                                    <input type="password" name='password' value={login.password} onChange={loginInpChnage} placeholder="Password" required />
                                                </div>
                                                <div className="single-input-item">
                                                    <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                                                        <div className="remember-meta">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="rememberMe" />
                                                                <label className="custom-control-label" htmlFor="rememberMe">Remember Me</label>
                                                            </div>
                                                        </div>
                                                        <Link to="/password/forgot" className="forget-pwd">Forget Password?</Link>
                                                    </div>
                                                </div>
                                                <div className="single-input-item">
                                                    <button type='submit' className="btn btn-sqr">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="login-reg-form-wrap sign-up-form">
                                            <h5>Singup Form</h5>
                                            <form method="post" onSubmit={registerFormSubmit}>
                                                <div className="single-input-item">
                                                    <input type="text" name='name' value={register.name} onChange={registerInpChnage} placeholder="Name" required />
                                                </div>
                                                <div className="single-input-item">
                                                    <input type="email" name='email' value={register.email} onChange={registerInpChnage} placeholder="Email" required />
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="single-input-item">
                                                            <input type="password" name='password' value={register.password} onChange={registerInpChnage} placeholder="Password" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="single-input-item">
                                                            <input type="password" name='confirm_password' value={register.confirm_password} onChange={registerInpChnage} placeholder="Confirm Password" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-input-item">
                                                    <div className="login-reg-form-meta">
                                                        <div className="remember-meta">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="subnewsletter" />
                                                                <label className="custom-control-label" htmlFor="subnewsletter">Subscribe
                                                                    Our Newsletter</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="single-input-item">
                                                    <button className="btn btn-sqr">Register</button>
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

export default Auth
