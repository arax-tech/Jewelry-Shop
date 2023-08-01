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
                <NavLink to="/admin/dashboard"><i className="fa fa-home"></i>Dashboard</NavLink>
                <NavLink to="/admin/category"><i className="fa fa-list"></i>Categories</NavLink>
                <NavLink to="/admin/product"><i className="fa fa-tags"></i>Products</NavLink>
                <NavLink to="/admin/review"><i className="fa fa-star"></i>Reviews</NavLink>
                <NavLink to="/admin/slider"><i className="fa fa-image"></i>Sliders</NavLink>
                <NavLink to="/admin/banner"><i className="fa fa-flag"></i>Banner</NavLink>
                <NavLink to="/admin/user"><i className="fa fa-users"></i>Users</NavLink>
                <NavLink to="/admin/order"><i className="fa fa-cart-arrow-down"></i>Orders</NavLink>
                <NavLink to="/admin/profile"><i className="fa fa-user"></i> Profile</NavLink>
                <NavLink to="/admin/password"><i className="fa fa-lock"></i>Password</NavLink>
                <Link onClick={logout} to="/"><i className="fa fa-sign-out"></i> Logout</Link>
            </div>
        </div>
    )
}

export default Sidebar
