import React from 'react'
import { Link } from 'react-router-dom'

const Modal = () => {
    return (
        <div className="modal clearfix" id="quick_view">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="product-details-inner">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="product-large-slider">
                                        <div className="pro-large-img img-zoom">
                                            <img src="/assets/img/product/product-details-img1.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-large-img img-zoom">
                                            <img src="/assets/img/product/product-details-img2.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-large-img img-zoom">
                                            <img src="/assets/img/product/product-details-img3.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-large-img img-zoom">
                                            <img src="/assets/img/product/product-details-img4.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-large-img img-zoom">
                                            <img src="/assets/img/product/product-details-img5.jpg" alt="product-details" />
                                        </div>
                                    </div>
                                    <div className="pro-nav slick-row-10 slick-arrow-style">
                                        <div className="pro-nav-thumb">
                                            <img src="/assets/img/product/product-details-img1.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-nav-thumb">
                                            <img src="/assets/img/product/product-details-img2.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-nav-thumb">
                                            <img src="/assets/img/product/product-details-img3.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-nav-thumb">
                                            <img src="/assets/img/product/product-details-img4.jpg" alt="product-details" />
                                        </div>
                                        <div className="pro-nav-thumb">
                                            <img src="/assets/img/product/product-details-img5.jpg" alt="product-details" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="product-details-des">
                                        <div className="manufacturer-name">
                                            <Link to="product-details.html">HasTech</Link>
                                        </div>
                                        <h3 className="product-name">Handmade Golden Necklace</h3>
                                        <div className="ratings d-flex">
                                            <span><i className="fa fa-star-o"></i></span>
                                            <span><i className="fa fa-star-o"></i></span>
                                            <span><i className="fa fa-star-o"></i></span>
                                            <span><i className="fa fa-star-o"></i></span>
                                            <span><i className="fa fa-star-o"></i></span>
                                            <div className="pro-review">
                                                <span>1 Reviews</span>
                                            </div>
                                        </div>
                                        <div className="price-box">
                                            <span className="price-regular">$70.00</span>
                                            <span className="price-old"><del>$90.00</del></span>
                                        </div>
                                        <h5 className="offer-text"><strong>Hurry up</strong>! offer ends in:</h5>
                                        <div className="product-countdown" data-countdown="2022/12/20"></div>
                                        <div className="availability">
                                            <i className="fa fa-check-circle"></i>
                                            <span>200 in stock</span>
                                        </div>
                                        <p className="pro-desc">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                                        <div className="quantity-cart-box d-flex align-items-center">
                                            <h6 className="option-title">qty:</h6>
                                            <div className="quantity">
                                                <div className="pro-qty"><input type="text" /></div>
                                            </div>
                                            <div className="action_link">
                                                <Link className="btn btn-cart2" to="#">Add to cart</Link>
                                            </div>
                                        </div>
                                        <div className="useful-links">
                                            <Link to="#" data-bs-toggle="tooltip" title="Compare"><i
                                                className="pe-7s-refresh-2"></i>compare</Link>
                                            <Link to="#" data-bs-toggle="tooltip" title="Wishlist"><i
                                                className="pe-7s-like"></i>wishlist</Link>
                                        </div>
                                        <div className="like-icon">
                                            <Link className="facebook" to="#"><i className="fa fa-facebook"></i>like</Link>
                                            <Link className="twitter" to="#"><i className="fa fa-twitter"></i>tweet</Link>
                                            <Link className="pinterest" to="#"><i className="fa fa-pinterest"></i>save</Link>
                                            <Link className="google" to="#"><i className="fa fa-google-plus"></i>share</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
