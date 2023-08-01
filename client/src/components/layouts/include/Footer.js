import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <React.Fragment>
            <div className="scroll-top not-visible">
                <i className="fa fa-angle-up"></i>
            </div>
            <footer className="footer-widget-area">
                <div className="footer-top section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="widget-item">
                                    <div className="widget-title">
                                        <div className="widget-logo">
                                            <Link to="/">
                                                <img src="/assets/img/logo/logo.png" alt="brand logo" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="widget-body">
                                        <p>We are a team of designers and developers that create high quality wordpress, shopify, Opencart </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="widget-item">
                                    <h6 className="widget-title">Contact Us</h6>
                                    <div className="widget-body">
                                        <address className="contact-block">
                                            <ul>
                                                <li><i className="pe-7s-home"></i> 4710-4890 Breckinridge USA</li>
                                                <li><i className="pe-7s-mail"></i> <a href="mailto:demo@plazathemes.com">demo@yourdomain.com </a></li>
                                                <li><i className="pe-7s-call"></i> <a href="tel:(012)800456789987">(012) 800 456 789-987</a></li>
                                            </ul>
                                        </address>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="widget-item">
                                    <h6 className="widget-title">Information</h6>
                                    <div className="widget-body">
                                        <ul className="info-list">
                                            <li><Link to="/about">about us</Link></li>
                                            <li><Link to="#">Delivery Information</Link></li>
                                            <li><Link to="#">privet policy</Link></li>
                                            <li><Link to="#">Terms & Conditions</Link></li>
                                            <li><Link to="/contact">contact us</Link></li>
                                            <li><Link to="/contact">site map</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="widget-item">
                                    <h6 className="widget-title">Follow Us</h6>
                                    <div className="widget-body social-link">
                                        <Link to="#"><i className="fa fa-facebook"></i></Link>
                                        <Link to="#"><i className="fa fa-twitter"></i></Link>
                                        <Link to="#"><i className="fa fa-instagram"></i></Link>
                                        <Link to="#"><i className="fa fa-youtube"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center mt-20">
                            <div className="col-md-6">
                                <div className="newsletter-wrapper">
                                    <h6 className="widget-title-text">Signup for newsletter</h6>
                                    <form className="newsletter-inner" id="mc-form">
                                        <input type="email" className="news-field" id="mc-email" autoComplete="off" placeholder="Enter your email address" />
                                        <button className="news-btn" id="mc-submit">Subscribe</button>
                                    </form>

                                    <div className="mailchimp-alerts">
                                        <div className="mailchimp-submitting"></div>
                                        <div className="mailchimp-success"></div>
                                        <div className="mailchimp-error"></div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="footer-payment">
                                    <img src="/assets/img/payment.png" alt="payment method" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="copyright-text text-center">
                                    <p>Copyright &copy; {(new Date().getFullYear())} <b>Corano</b> Made By <i className="fa fa-heart text-danger"></i> by <a target="_blank" rel="noreferrer" href="https://www.fiverr.com/arham_khan_web"><b>Arham Khan</b></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>



        </React.Fragment>
    )
}

export default Footer
