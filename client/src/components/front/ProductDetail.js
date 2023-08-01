import { Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddToCart } from '../../redux/actions/CartAction'
import { getProductDetail, ProductReviewFunction } from '../../redux/actions/WebSiteAction'
import { PRODUCT_REVIEW_RESET } from '../../redux/constants/WebSiteConstant'
import App from '../layouts/App'
import Loading from '../layouts/include/Loading'
import MetaData from '../layouts/include/MetaData'
import Product from './Product'

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { loading, product, relatedProducts, message, isReviewed } = useSelector((state) => state.website);
    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [dispatch, id])


    const options = {
        size: "medium",
        value: Math.round(product?.ratings * 100) / 100,
        readOnly: true,
        precision: 0.5
    }

    let price = 0;
    if (product?.onSale === "Yes") {
        const off = product?.price * product?.salePercentage / 100;
        price = product?.price - off;
    } else {
        price = product?.price;
    }

    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [isActive, setIsActive] = useState(false);


    const handleClick = () => {
        // 👇️ toggle
        setIsActive(current => !current);

        // 👇️ or set to true
        // setIsActive(true);
    };


    const colorHander = (clr) => {
        setColor(clr);
        setIsActive(current => !current);
    }


    const addToCart = () => {
        if (product.stock <= quantity) {
            toast.error(`Sorry we have only ${product?.stock} item in stock...`, { theme: "colored" })
            return;
        } else if (size === null) {
            toast.error(`Please Select Product Size...`, { theme: "colored" })
            return;
        } else if (color === null) {
            toast.error(`Please Select Product Color...`, { theme: "colored" })
            return;
        } else {
            dispatch(AddToCart(id, quantity, color, size))
            toast.success("Item Added to Cart...", { theme: "colored" })
        }
    }



    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);

    const reviewSubmitHander = (event) => {
        event.preventDefault();
        if (isAuthenticated === false) {
            toast.error("Please login then you can add review...", { theme: "colored" })

        } else {
            if (comment === null) {
                toast.error("Comment is required...", { theme: "colored" })
            } else if (rating === null) {
                toast.error("Rating is required...", { theme: "colored" })
            } else {
                dispatch(ProductReviewFunction(id, comment, rating))

            }

        }
    }
    useEffect(() => {
        if (isReviewed && isReviewed === true) {
            toast.success(message, { theme: "colored" });
            dispatch({ type: PRODUCT_REVIEW_RESET })
            dispatch(getProductDetail(id));
        }
    }, [dispatch, isReviewed, message, id])


    return (
        loading ? <Loading /> :
            <App>
                <MetaData title={product?.name} />
                <main>
                    <div className="breadcrumb-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadcrumb-wrap">
                                        <nav aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i></Link></li>
                                                <li className="breadcrumb-item"><Link to="/shop">shop</Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">product details</li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="shop-main-wrapper section-padding pb-0">
                        <div className="container">
                            <div className="row">

                                <div className="col-lg-12 order-1 order-lg-2">

                                    <div className="product-details-inner">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <div className="product-large-slider">

                                                    {
                                                        product?.images.map((i, index) => (
                                                            <div key={index} className="pro-large-img img-zoom">
                                                                <img src={i.image} alt="" />
                                                            </div>

                                                        ))
                                                    }

                                                </div>
                                                <div className="pro-nav slick-row-10 slick-arrow-style">
                                                    {
                                                        product?.images.map((i, index) => (
                                                            <div key={index} className="pro-nav-thumb">
                                                                <img src={i.image} alt="" />
                                                            </div>

                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="product-details-des">
                                                    <div className="manufacturer-name">
                                                        <Link to={`/categroy/${product?.category._id}`}>{product?.category.name}</Link>
                                                    </div>
                                                    <h3 className="product-name">{product?.name}</h3>
                                                    <div className="ratings d-flex">
                                                        <Rating {...options} />
                                                        <div className="pro-review">
                                                            <span>({Math.round(product?.ratings * 100) / 100} / {product?.numberOfReviews} Reviews)</span>
                                                        </div>
                                                    </div>
                                                    <div className="price-box">
                                                        <span className="price-regular">${price}.00</span>
                                                        {
                                                            product?.onSale === "Yes" &&
                                                            <span className="price-old"><del>${product?.price}.00</del></span>
                                                        }
                                                    </div>



                                                    <div className="availability">

                                                        {
                                                            product?.stock < 1 ?
                                                                <>
                                                                    <span className='text-danger'>out of stock</span>
                                                                </> :
                                                                <>
                                                                    <i className="fa fa-check-circle"></i>
                                                                    <span>{product?.stock} in stock</span>
                                                                </>
                                                        }


                                                    </div>
                                                    <p className="pro-desc">
                                                        {product?.description.substr(0, 150)}{product?.description.length > 149 && "..."}
                                                    </p>

                                                    <div className="pro-size" style={{ width: "22%" }}>
                                                        <h6 className="option-title">size: &nbsp;</h6>
                                                        <select className='product__detail__input' style={{ marginTop: "-10px" }} value={size} onChange={e => setSize(e.target.value)}>
                                                            <option value="">Choose</option>
                                                            {
                                                                product?.sizes.map((size, index) => (
                                                                    <option key={index} value={size}>{size}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="color-option">
                                                        <h6 className="option-title">color :</h6>
                                                        <ul className="color-categories custom_categories">
                                                            {
                                                                product?.colors.map((color, index) => (
                                                                    <li onClick={handleClick} key={index} >
                                                                        <Link className={color} style={{ width: isActive ? '20px !important' : '', height: isActive ? '20px !important' : '' }} onClick={() => colorHander(color)} to="" title={color.split("-")[1]}></Link>
                                                                    </li>
                                                                ))
                                                            }


                                                        </ul>
                                                    </div>

                                                    {
                                                        product?.stock > 0 && (
                                                            <div className="quantity-cart-box d-flex align-items-center">
                                                                <h6 className="option-title">qty:</h6>
                                                                <div className="quantity" style={{ width: "15%" }}>
                                                                    <input className='product__detail__input' type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min={1} max={product?.stock} />
                                                                </div>
                                                                <div className="action_link">
                                                                    <button onClick={addToCart} className="btn btn-cart2">Add to cart</button>
                                                                </div>
                                                            </div>

                                                        )
                                                    }

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



                                    <div className="product-details-reviews section-padding pb-0">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="product-review-info">
                                                    <ul className="nav review-tab">
                                                        <li>
                                                            <Link className="active" data-bs-toggle="tab" to="#tab_one">description</Link>
                                                        </li>
                                                        <li>
                                                            <Link data-bs-toggle="tab" to="#tab_two">information</Link>
                                                        </li>
                                                        <li>
                                                            <Link data-bs-toggle="tab" to="#tab_three">reviews ({product?.numberOfReviews})</Link>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content reviews-tab">
                                                        <div className="tab-pane fade show active" id="tab_one">
                                                            <div className="tab-one">
                                                                <p>
                                                                    {product?.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="tab_two">
                                                            <table className="table table-bordered">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Name</td>
                                                                        <td>{product?.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Price</td>
                                                                        <td>$ {product?.price}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Stock</td>
                                                                        <td>{product?.stock}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Category</td>
                                                                        <td>{product?.category.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Colors</td>
                                                                        <td>
                                                                            {
                                                                                product?.colors.map((color) => (
                                                                                    <span>{color.split("c-")[1]}, </span>
                                                                                ))
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Size</td>
                                                                        <td>
                                                                            {
                                                                                product?.sizes.map((size) => (
                                                                                    <span>{size}, </span>
                                                                                ))
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="tab-pane fade" id="tab_three">
                                                            <div className="container-fluid">
                                                                <div className='container'>
                                                                    <div className='row'>
                                                                        <div className="col-md-6">
                                                                            <div className="mb-3">
                                                                                <h3 className="font-size-18 mb-3">Based on {product?.numberOfReviews} Reviews</h3>
                                                                                <h2 className="font-size-30 font-weight-bold text-lh-1 mb-0">{Math.round(product?.ratings * 100) / 100}</h2>
                                                                                <div className="text-lh-1">overall</div>
                                                                            </div>

                                                                            <ul className="list-unstyled">
                                                                                <li className="py-1">
                                                                                    <Link to="" className="row align-items-center mx-gutters-2 font-size-1">
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="text-warning text-ls-n2 font-size-14">
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="progress ml-xl-5" style={{ height: "10px", width: "200px" }}>
                                                                                                <div className="progress-bar" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </Link>
                                                                                </li>

                                                                                <li className="py-1">
                                                                                    <Link to="" className="row align-items-center mx-gutters-2 font-size-1">
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="text-warning text-ls-n2 font-size-14">
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="progress  ml-xl-5" style={{ height: "10px", width: "200px" }}>
                                                                                                <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </Link>
                                                                                </li>

                                                                                <li className="py-1">
                                                                                    <Link to="" className="row align-items-center mx-gutters-2 font-size-1">
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="text-warning text-ls-n2 font-size-14">
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="progress  ml-xl-5" style={{ height: "10px", width: "200px" }}>
                                                                                                <div className="progress-bar" role="progressbar" style={{ width: "60%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </Link>
                                                                                </li>



                                                                                <li className="py-1">
                                                                                    <Link to="" className="row align-items-center mx-gutters-2 font-size-1">
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="text-warning text-ls-n2 font-size-14">
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="progress  ml-xl-5" style={{ height: "10px", width: "200px" }}>
                                                                                                <div className="progress-bar" role="progressbar" style={{ width: "40%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </Link>
                                                                                </li>



                                                                                <li className="py-1">
                                                                                    <Link to="" className="row align-items-center mx-gutters-2 font-size-1">
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="text-warning text-ls-n2 font-size-14">
                                                                                                <span className="fa fa-star"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                                <span className="fa fa-star text-muted"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-auto mb-2 mb-md-0">
                                                                                            <div className="progress  ml-xl-5" style={{ height: "10px", width: "200px" }}>
                                                                                                <div className="progress-bar" role="progressbar" style={{ width: "20%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </Link>
                                                                                </li>

                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <h3 className="font-size-18 mb-5">Add Review</h3>
                                                                            <form method='post' onSubmit={reviewSubmitHander}>

                                                                                <div className="js-form-message form-group mb-3 row">
                                                                                    <div className="col-md-4 col-lg-3">
                                                                                        <label className="form-label">Comment <span className="text-danger">*</span></label>
                                                                                    </div>
                                                                                    <div className="col-md-8 col-lg-9">
                                                                                        <textarea className="form-control" onChange={(event) => setComment(event.target.value)} rows="3" name="comment">{comment}</textarea>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="js-form-message form-group mb-5 row">
                                                                                    <div className="col-md-4 col-lg-3">
                                                                                        <label for="ratings" className="form-label">Rating <span className="text-danger">*</span></label>
                                                                                    </div>
                                                                                    <div className="col-md-8 col-lg-9">

                                                                                        <Rating
                                                                                            onChange={(event) => setRating(event.target.value)}
                                                                                            value={rating}
                                                                                            size="large"
                                                                                        />
                                                                                    </div>
                                                                                </div>




                                                                                <div className="row">
                                                                                    <div className="offset-md-4 offset-lg-3 col-auto">
                                                                                        <button type="submit" className="btn btn-sqr w-100">Add Review</button>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>


                                                                    {
                                                                        product?.reviews[0] ?
                                                                            <>
                                                                                <div className="row mt-3 testimonial">
                                                                                    <div className="col-sm-12">
                                                                                        <div className="headline text-center mb-5">
                                                                                            <h2 className="pb-3 position-relative d-inline-block">Customers Reviews</h2>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-12 col-lg-12 text-center row">
                                                                                        {
                                                                                            product.reviews && product.reviews.map((review, key) => (



                                                                                                <div className="col-sm-4 col-md-3 col-lg-3 shadow-lg p-0">
                                                                                                    <div className="testimonial-wrapper">
                                                                                                        <img className="img-thumbnail w-100" src={review.image ? review.image : "/assets/placeholder.jpg"} alt="" />
                                                                                                        <div className="username">
                                                                                                            <h3> {review.name}</h3>
                                                                                                            <div style={{ margin: "0rem 0rem" }} className='d-flex align-items-center justify-content-center'>
                                                                                                                <Rating
                                                                                                                    size={"medium"}
                                                                                                                    value={Math.round(review.rating * 100) / 100}
                                                                                                                    readOnly={true}
                                                                                                                    precision={0.5} />
                                                                                                            </div>
                                                                                                            <p className='pb-3'> {review.comment} </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <div className="row testimonial">
                                                                                    <div className="col-sm-12">
                                                                                        <div className="headline text-center">
                                                                                            <h2 className="pb-3 position-relative d-inline-block">No Reviews Added...</h2>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>



                    {
                        relatedProducts && (
                            <section class="related-products section-padding">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-12">

                                            <div class="section-title text-center">
                                                <h2 class="title">Related Products</h2>
                                                <p class="sub-title">Add related products to weekly lineup</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="product-carousel-4 slick-row-10 slick-arrow-style">
                                                {
                                                    relatedProducts?.map((product, index) => (
                                                        <Product key={index} product={product} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        )
                    }




                </main>
            </App >
    )
}

export default ProductDetail
