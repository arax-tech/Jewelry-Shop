import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthLogout } from '../../../../redux/actions/AuthAction';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(AuthLogout());
        toast.error("Logout Successfully...", { theme: "colored" });
        navigate("/")
    }

    return (
        <div className="col-lg-3 col-md-4 custom__sidebar">
            <div className="myaccount-tab-menu nav" role="tablist">
                <NavLink to="/user/dashboard"><i className="fa fa-home"></i>Dashboard</NavLink>
                <NavLink to="/user/order"><i className="fa fa-cart-arrow-down"></i>Orders</NavLink>
                <NavLink to="/user/profile"><i className="fa fa-user"></i> Profile</NavLink>
                <NavLink to="/user/password"><i className="fa fa-lock"></i>Password</NavLink>
                <Link onClick={logout} to="/"><i className="fa fa-sign-out"></i> Logout</Link>
            </div>
        </div>
    )
}

export default Sidebar
