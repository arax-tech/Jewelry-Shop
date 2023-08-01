import React from 'react'
import { Link } from 'react-router-dom'

import { Rating } from '@mui/material';

const Product = ({ product, list }) => {

    const options = {
        size: "small",
        value: Math.round(product.ratings * 100) / 100,
        readOnly: true,
        precision: 0.5
    }

    let price = 0;
    if (product.onSale === "Yes") {
        const off = Math.round(product.price * product.salePercentage / 100);
        price = product.price - off;
    } else {
        price = product.price;
    }

    return (
        <React.Fragment>
            <div className="product-item">
                <figure className="product-thumb">
                    <Link to={`/product/${product._id}`}>
                        <img className="pri-img" src={product.images[0] && product.images[0].image} alt="" />
                        <img className="sec-img" src={product.images[1] && product.images[1].image} alt="" />
                    </Link>

                    {
                        product.onSale === "Yes" ?

                            <div className="product-badge">
                                <div className="product-label new">
                                    <span>On Sale</span>
                                </div>
                                <div className="product-label discount">
                                    <span>{product.salePercentage} % Off</span>
                                </div>
                            </div>
                            :
                            ""
                    }


                    <div className="button-group">
                        <Link to="#" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to wishlist"><i className="pe-7s-like"></i></Link>
                        <Link to="" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Compare"><i className="pe-7s-refresh-2"></i></Link>
                        <Link to={`/product/${product._id}`}><span data-bs-toggle="tooltip" data-bs-placement="left" title="View Product"><i className="pe-7s-search"></i></span></Link>
                    </div>
                    <div className="cart-hover">
                        <Link to={`/product/${product._id}`} className="btn btn-cart">View</Link>
                    </div>
                </figure>
                <div className="product-caption text-center text-capitalize">
                    <ul className="color-categories">
                        {
                            product.colors?.map((color, index) => (
                                <li key={index}><Link className={`text-capitalize ${color}`} to="#" data-bs-toggle="tooltip" data-bs-placement="top" title={color.split("-")[1]}></Link></li>
                            ))
                        }
                    </ul>
                    <div className="product-identity">
                        <p className="manufacturer-name d-flex justify-content-center align-items-center">
                            <Rating {...options} /> &nbsp; ({Math.round(product.ratings * 100) / 100} / {product.numberOfReviews} Reviews)
                        </p>
                    </div>

                    <h6 className="product-name">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h6>
                    <div className="price-box">
                        <span className="price-regular">${price}.00</span>
                        {
                            product.onSale === "Yes" &&
                            <span className="price-old"><del>${product.price}.00</del></span>
                        }

                    </div>
                </div>
            </div>

            {
                list && (
                    <div className="product-list-item">
                        <figure className="product-thumb">
                            <Link to="product-details.html">
                                <img className="pri-img" src="assets/img/product/product-1.jpg" alt="product" />
                                <img className="sec-img" src="assets/img/product/product-18.jpg" alt="product" />
                            </Link>
                            <div className="product-badge">
                                <div className="product-label new">
                                    <span>new</span>
                                </div>
                                <div className="product-label discount">
                                    <span>10%</span>
                                </div>
                            </div>
                            <div className="button-group">
                                <Link to="wishlist.html" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to wishlist"><i className="pe-7s-like"></i></Link>
                                <Link to="compare.html" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Compare"><i className="pe-7s-refresh-2"></i></Link>
                                <Link to="#" data-bs-toggle="modal" data-bs-target="#quick_view"><span data-bs-toggle="tooltip" data-bs-placement="left" title="Quick View"><i className="pe-7s-search"></i></span></Link>
                            </div>
                            <div className="cart-hover">
                                <button className="btn btn-cart">add to cart</button>
                            </div>
                        </figure>
                        <div className="product-content-list">
                            <div className="manufacturer-name">
                                <Link to="product-details.html">Platinum</Link>
                            </div>
                            <ul className="color-categories">
                                <li>
                                    <Link className="c-lightblue" to="#" title="LightSteelblue"></Link>
                                </li>
                                <li>
                                    <Link className="c-darktan" to="#" title="Darktan"></Link>
                                </li>
                                <li>
                                    <Link className="c-grey" to="#" title="Grey"></Link>
                                </li>
                                <li>
                                    <Link className="c-brown" to="#" title="Brown"></Link>
                                </li>
                            </ul>

                            <h5 className="product-name"><Link to="product-details.html">Perfect Diamond Jewelry</Link></h5>
                            <div className="price-box">
                                <span className="price-regular">$50.00</span>
                                <span className="price-old"><del>$29.99</del></span>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde perspiciatis
                                quod numquam, sit fugiat, deserunt ipsa mollitia sunt quam corporis ullam
                                rem, accusantium adipisci officia eaque.</p>
                        </div>
                    </div>
                )
            }



        </React.Fragment >


    )
}

export default Product
