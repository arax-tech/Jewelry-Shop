import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthLogout } from '../../../redux/actions/AuthAction';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const subtotal = cartItems.reduce((acc, item) => acc + item.product_quantity * item.product_price, 0);
    const shipping = 5;

    const logoutFunction = () => {
        dispatch(AuthLogout());
        toast.error("Logout Successfully...", { theme: "colored" });
        navigate("/")
    }
    return (
        <React.Fragment>
            <header className="header-area header-wide">
                <div className="main-header d-none d-lg-block">
                    <div className="header-top bdr-bottom">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="welcome-message">
                                        <p>Welcome to Jewelry online store</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-right">
                                    <div className="header-top-settings">
                                        <ul className="nav align-items-center justify-content-end">
                                            <li className="curreny-wrap">
                                                $ Currency
                                                <i className="fa fa-angle-down rounded-circle"></i>
                                                <ul className="dropdown-list curreny-list">
                                                    <li><Link to="#">$ USD</Link></li>
                                                    <li><Link to="#">€ EURO</Link></li>
                                                </ul>
                                            </li>
                                            <li className="language">
                                                <img src="/assets/img/icon/en.png" alt="flag" /> English
                                                <i className="fa fa-angle-down"></i>
                                                <ul className="dropdown-list">
                                                    <li><Link to="#"><img src="/assets/img/icon/en.png" alt="flag" /> english</Link></li>
                                                    <li><Link to="#"><img src="/assets/img/icon/fr.png" alt="flag" /> french</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header-main-area sticky">
                        <div className="container">
                            <div className="row align-items-center position-relative">

                                <div className="col-lg-2">
                                    <div className="logo">
                                        <Link to="/">
                                            <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-lg-6 position-static">
                                    <div className="main-menu-area">
                                        <div className="main-menu">


                                            <nav className="desktop-menu">
                                                <ul>
                                                    <li><NavLink to="/">Home</NavLink></li>
                                                    <li><NavLink to="/shop">Shop</NavLink></li>
                                                    <li><NavLink to="/about">About</NavLink></li>
                                                    <li><NavLink to="/blog">Blog</NavLink></li>
                                                    <li><NavLink to="/contact">Contact</NavLink></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="header-right d-flex align-items-center justify-content-xl-between justify-content-lg-end">
                                        <div className="header-search-container">

                                        </div>
                                        <div className="header-configure-area">
                                            <ul className="nav justify-content-end align-items-center">
                                                <li className="user-hover">
                                                    <Link to="/auth">
                                                        {
                                                            user && user.image ?
                                                                <img className='rounded-circle' style={{ width: "30px" }} src={user.image} alt="" />
                                                                :
                                                                <i className="pe-7s-user"></i>
                                                        }
                                                    </Link>
                                                    <ul className="dropdown-list">
                                                        {
                                                            isAuthenticated && isAuthenticated === true ?
                                                                <>
                                                                    <li><Link to={`/${role}/dashboard`}>Dashboard</Link></li>
                                                                    <li><Link to={`/${role}/profile`}>Profile</Link></li>
                                                                    <li><Link onClick={logoutFunction} to="/">Logout</Link></li>
                                                                </>
                                                                :
                                                                <li><Link to="/auth">Login / Register</Link></li>

                                                        }
                                                    </ul>
                                                </li>
                                                <li>
                                                    <Link to="/wishlist">
                                                        <i className="pe-7s-like"></i>
                                                        <div className="notification">0</div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/cart" className="minicart-btn">
                                                        <i className="pe-7s-shopbag"></i>
                                                        <div className="notification">{cartItems?.length}</div>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mobile-header d-lg-none d-md-block sticky">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="mobile-main-header">
                                    <div className="mobile-logo">
                                        <Link to="/">
                                            <img src="/assets/img/logo/logo.png" alt="Brand Logo" />
                                        </Link>
                                    </div>
                                    <div className="mobile-menu-toggler">
                                        <div className="mini-cart-wrap">
                                            <Link to="/cart">
                                                <i className="pe-7s-shopbag"></i>
                                                <div className="notification">0</div>
                                            </Link>
                                        </div>
                                        <button className="mobile-menu-btn">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="off-canvas-wrapper">
                    <div className="off-canvas-overlay"></div>
                    <div className="off-canvas-inner-content">
                        <div className="btn-close-off-canvas">
                            <i className="pe-7s-close"></i>
                        </div>

                        <div className="off-canvas-inner">
                            <div className="search-box-offcanvas">
                                <form>
                                    <input type="text" placeholder="Search Here..." />
                                    <button className="search-btn"><i className="pe-7s-search"></i></button>
                                </form>
                            </div>


                            <div className="mobile-navigation">


                                <nav>
                                    <ul className="mobile-menu">
                                        <li><NavLink to="/">Home</NavLink></li>
                                        <li><NavLink to="/shop">Shop</NavLink></li>
                                        <li><NavLink to="/about">About</NavLink></li>
                                        <li><NavLink to="/blog">Blog</NavLink></li>
                                        <li><NavLink to="/contact">Contact</NavLink></li>
                                    </ul>
                                </nav>

                            </div>

                            <div className="mobile-settings">
                                <ul className="nav">
                                    <li>
                                        <div className="dropdown mobile-top-dropdown">
                                            <Link to="#" className="dropdown-toggle" id="currency" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Currency
                                                <i className="fa fa-angle-down"></i>
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="currency">
                                                <Link className="dropdown-item" to="#">$ USD</Link>
                                                <Link className="dropdown-item" to="#">$ EURO</Link>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="dropdown mobile-top-dropdown">
                                            <Link to="#" className="dropdown-toggle" id="myaccount" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                My Account
                                                <i className="fa fa-angle-down"></i>
                                            </Link>
                                            <div className="dropdown-menu" aria-labelledby="myaccount">
                                                <Link className="dropdown-item" to="/use/dashboard">Dashboard</Link>
                                                <Link className="dropdown-item" to="/auth"> Login / Register</Link>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                            <div className="offcanvas-widget-area">
                                <div className="off-canvas-contact-widget">
                                    <ul>
                                        <li><i className="fa fa-mobile"></i>
                                            <Link to="#">0123456789</Link>
                                        </li>
                                        <li><i className="fa fa-envelope-o"></i>
                                            <Link to="#">info@yourdomain.com</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="off-canvas-social-widget">
                                    <Link to="#"><i className="fa fa-facebook"></i></Link>
                                    <Link to="#"><i className="fa fa-twitter"></i></Link>
                                    <Link to="#"><i className="fa fa-pinterest-p"></i></Link>
                                    <Link to="#"><i className="fa fa-linkedin"></i></Link>
                                    <Link to="#"><i className="fa fa-youtube-play"></i></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </aside>

            </header>













            <div className="offcanvas-minicart-wrapper">
                <div className="minicart-inner">
                    <div className="offcanvas-overlay"></div>
                    <div className="minicart-inner-content">
                        <div className="minicart-close">
                            <i className="pe-7s-close"></i>
                        </div>

                        {
                            cartItems.length > 0
                                ?
                                <>
                                    <div className="minicart-content-box">
                                        <div className="minicart-item-wrapper">
                                            <ul>
                                                {
                                                    cartItems?.map((cart, index) => (
                                                        <li key={index} className="minicart-item">
                                                            <div className="minicart-thumb">
                                                                <Link to={`product/${cart.product_id}`}>
                                                                    <img src={cart.product_image} alt="" />
                                                                </Link>
                                                            </div>
                                                            <div className="minicart-content">
                                                                <h3 className="product-name">
                                                                    <Link to={`product/${cart.product_id}`}>{cart.product_name}</Link>
                                                                </h3>
                                                                <p>
                                                                    <span className="cart-quantity">{cart.product_name} <strong>&times;</strong></span>
                                                                    <span className="cart-price">${cart.product_price}.00</span>
                                                                </p>
                                                            </div>
                                                            <button className="minicart-remove"><i className="pe-7s-close"></i></button>
                                                        </li>
                                                    ))
                                                }

                                            </ul>
                                        </div>

                                        <div className="minicart-pricing-box">
                                            <ul>
                                                <li>
                                                    <span>Sub Total</span>
                                                    <span><strong>${subtotal}.00</strong></span>
                                                </li>
                                                <li>
                                                    <span>Shipping</span>
                                                    <span><strong>${shipping}.00</strong></span>
                                                </li>

                                                <li className="total">
                                                    <span>Grand Total </span>
                                                    <span><strong>${subtotal + shipping}.00</strong></span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="minicart-button">
                                            <Link to="/cart"><i className="fa fa-shopping-cart"></i> View Cart</Link>
                                            <Link to="/auth?redirect=/checkout"><i className="fa fa-share"></i> Checkout</Link>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <section className="mt-5">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="headline text-center ">
                                                        <h2 className="pb-3 position-relative d-inline-block">Yout cart is empty...</h2>
                                                        <br /> <br />
                                                        <Link className="btn btn-sqr btn-lg" to="/">Continue Shopping</Link>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </section>
                                </>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
