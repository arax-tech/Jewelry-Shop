import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBanners, getCategories, getFutureProducts, getProducts, getShopProducts, getSliders } from '../../redux/actions/WebSiteAction'
import App from '../layouts/App'
import Loading from '../layouts/include/Loading'
import MetaData from '../layouts/include/MetaData'
import Product from './Product'

const Home = () => {
    const dispatch = useDispatch();

    const { loading, sliders, banners, categories, futureProducts, products, shopProducts, shopCategories } = useSelector((state) => state.website);

    const randomBanner = banners && banners[Math.floor(Math.random() * banners.length)];

    // eslint-disable-next-line

    const [category, setCategory] = useState(shopCategories && shopCategories[0]._id);




    const categoryHandel = (id) => {
        setCategory(shopCategories && shopCategories[id]._id);

    }
    const { keyword, currentPage, price } = "";

    useEffect(() => {
        dispatch(getSliders());
        dispatch(getBanners());
        dispatch(getCategories());
        dispatch(getProducts());
        dispatch(getFutureProducts());
        dispatch(getShopProducts(keyword && keyword, currentPage, price, category))
    }, [dispatch, category, keyword, currentPage, price])

    return (
        loading ? <Loading /> :
            <App>
                <MetaData title="Home" />
                <main>
                    <section className="slider-area">

                        <div className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style">

                            {
                                sliders?.map((slider, index) => (
                                    <div key={index} className="hero-single-slide hero-overlay">
                                        <div className="hero-slider-item bg-img" data-bg={slider.image}>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="hero-slider-content slide-1">
                                                            <h2 className="slide-title">{slider.title.split("<span>")[0]} <span>{slider.title.split("<span>")[1]}</span></h2>
                                                            <h4 className="slide-desc">{slider.description}</h4>
                                                            <Link to={slider.link} className="btn btn-hero">Read More</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                        </div>
                    </section>



                    <div className="service-policy section-padding">
                        <div className="container">
                            <div className="row mtn-30">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="policy-item">
                                        <div className="policy-icon">
                                            <i className="pe-7s-plane"></i>
                                        </div>
                                        <div className="policy-content">
                                            <h6>Free Shipping</h6>
                                            <p>Free shipping all order</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="policy-item">
                                        <div className="policy-icon">
                                            <i className="pe-7s-help2"></i>
                                        </div>
                                        <div className="policy-content">
                                            <h6>Support 24/7</h6>
                                            <p>Support 24 hours a day</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="policy-item">
                                        <div className="policy-icon">
                                            <i className="pe-7s-back"></i>
                                        </div>
                                        <div className="policy-content">
                                            <h6>Money Return</h6>
                                            <p>30 days for free return</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-3">
                                    <div className="policy-item">
                                        <div className="policy-icon">
                                            <i className="pe-7s-credit"></i>
                                        </div>
                                        <div className="policy-content">
                                            <h6>100% Payment Secure</h6>
                                            <p>We ensure secure payment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="banner-statistics-area">
                        <div className="container">
                            <div className="row row-20 mtn-20">

                                {
                                    banners?.map((banner, index) => (
                                        <div key={index} className="col-sm-6">
                                            <figure className="banner-statistics mt-20">
                                                <Link to={banner.link}>
                                                    <img src={banner.image} alt={banner.title} />
                                                </Link>
                                                <div className="banner-content text-right">
                                                    <h5 className="banner-text1">{banner.tag}</h5>
                                                    <h2 className="banner-text2">{banner.title.split("<span>")[0]}<span>{banner.title.split("<span>")[1]}</span></h2>
                                                    <Link to={banner.link} className="btn btn-text">Shop Now</Link>
                                                </div>
                                            </figure>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </div>



                    <section className="product-banner-statistics section-padding">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <h2 className="title">our categories</h2>
                                        <p className="sub-title">filter products by categories</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-banner-carousel slick-row-10">
                                        {
                                            categories?.map((category, index) => (
                                                <div className="banner-slide-item">
                                                    <figure className="banner-statistics">
                                                        <Link to={`/category/${category._id}`}>
                                                            <img src={category.image} alt={category.name} />
                                                        </Link>
                                                        <div className="banner-content banner-content_style2">
                                                            <h5 className="banner-text3"><Link to={`/category/${category._id}`}>{category.name}</Link></h5>
                                                        </div>
                                                    </figure>
                                                </div>

                                            ))
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>





                    <section className="product-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <h2 className="title">our products</h2>
                                        <p className="sub-title">Add our products to weekly lineup</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-container">
                                        <div className="product-tab-menu">
                                            <ul className="nav justify-content-center">
                                                {
                                                    shopCategories?.map((categroy, index) => (
                                                        <li key={index} onClick={() => categoryHandel(index)}><Link to="#" className={index === 0 && "active"} data-bs-toggle="tab">{categroy.name}</Link></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <div className="tab-content">
                                            <div className="tab-pane fade show active">
                                                <div className="product-carousel-4 slick-row-10 slick-arrow-style">
                                                    {
                                                        shopProducts?.map((product, index) => (
                                                            <Product key={index} product={product} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                    <section className="feature-product section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <h2 className="title">featured products</h2>
                                        <p className="sub-title">Add featured products to weekly lineup</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="product-carousel-4_2 slick-row-10 slick-arrow-style">
                                        {
                                            futureProducts?.map((product, index) => (
                                                <Product key={index} product={product} />
                                            ))
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                    <section className="group-product-area section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6" style={{ backgroundColor: "#f4f4f4" }}>
                                    <div className="group-product-banner">
                                        <figure className="banner-statistics">
                                            <Link to="#">
                                                <img src={randomBanner && randomBanner.image} alt="" />
                                            </Link>
                                            <div className="banner-content banner-content_style3 text-center">
                                                <h5 className="banner-text1">{randomBanner && randomBanner.tag}</h5>
                                                <h2 className="banner-text2">{randomBanner && randomBanner.title.split("<span>")[0]} {randomBanner && randomBanner.title.split("<span>")[1]}</h2>
                                                <Link to={`/category/${randomBanner && randomBanner._id}`} className="btn btn-text">Shop Now</Link>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="categories-group-wrapper">
                                        <div className="section-title-append">
                                            <h4>future product</h4>
                                            <div className="slick-append"></div>
                                        </div>

                                        <div className="group-list-item-wrapper">
                                            <div className="group-list-carousel">
                                                {
                                                    futureProducts?.map((product, index) => (


                                                        <div key={index} className="group-slide-item">
                                                            <div className="group-item">
                                                                <div className="group-item-thumb">
                                                                    <Link to={`/product/${product._id}`}>
                                                                        <img src={product.images[0] && product.images[0].image} alt="" />
                                                                    </Link>
                                                                </div>
                                                                <div className="group-item-desc">
                                                                    <h5 className="group-product-name"><Link to={`/product/${product._id}`}>{product.name}</Link></h5>
                                                                    <div className="price-box">
                                                                        {
                                                                            product.onSale === "Yes" ?
                                                                                <span className="price-regular">${Math.round(product.price - product.price * product.salePercentage / 100)}.00</span>
                                                                                :
                                                                                <span className="price-regular">${product.price}.00</span>
                                                                        }
                                                                        {
                                                                            product.onSale === "Yes" &&
                                                                            <span className="price-old"><del>${product.price}.00</del></span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="categories-group-wrapper">
                                        <div className="section-title-append">
                                            <h4>on-sale product</h4>
                                            <div className="slick-append"></div>
                                        </div>

                                        <div className="group-list-item-wrapper">
                                            <div className="group-list-carousel">


                                                {
                                                    products?.map((product, index) => (


                                                        product.onSale === "Yes" && (
                                                            <div key={index} className="group-slide-item">
                                                                <div className="group-item">
                                                                    <div className="group-item-thumb">
                                                                        <Link to={`/product/${product._id}`}>
                                                                            <img src={product.images[0] && product.images[0].image} alt="" />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="group-item-desc">
                                                                        <h5 className="group-product-name"><Link to={`/product/${product._id}`}>{product.name}</Link></h5>
                                                                        <div className="price-box">
                                                                            {
                                                                                product.onSale === "Yes" ?
                                                                                    <span className="price-regular">$ {Math.round(product.price - product.price * product.salePercentage / 100)}.00</span>
                                                                                    :
                                                                                    <span className="price-regular">${product.price}.00</span>
                                                                            }
                                                                            {
                                                                                product.onSale === "Yes" &&
                                                                                <span className="price-old"><del>${product.price}.00</del></span>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        )


                                                    ))
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="latest-blog-area section-padding pt-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center">
                                        <h2 className="title">latest blogs</h2>
                                        <p className="sub-title">There are latest blog posts</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="blog-carousel-active slick-row-10 slick-arrow-style">
                                        <div className="blog-post-item">
                                            <figure className="blog-thumb">
                                                <Link to="">
                                                    <img src="/assets/img/blog/blog-img1.jpg" alt="blogs" />
                                                </Link>
                                            </figure>
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <p>25/03/2022 | <Link to="">Admin</Link></p>
                                                </div>
                                                <h5 className="blog-title">
                                                    <Link to="">Celebrity Daughter Opens Up About Having Her Eye Color Changed</Link>
                                                </h5>
                                            </div>
                                        </div>

                                        <div className="blog-post-item">
                                            <figure className="blog-thumb">
                                                <Link to="">
                                                    <img src="/assets/img/blog/blog-img2.jpg" alt="blogs" />
                                                </Link>
                                            </figure>
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <p>25/04/2022 | <Link to="">Admin</Link></p>
                                                </div>
                                                <h5 className="blog-title">
                                                    <Link to="">Children Left Home Alone For 4 Days In TV series Experiment</Link>
                                                </h5>
                                            </div>
                                        </div>

                                        <div className="blog-post-item">
                                            <figure className="blog-thumb">
                                                <Link to="">
                                                    <img src="/assets/img/blog/blog-img3.jpg" alt="blogs" />
                                                </Link>
                                            </figure>
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <p>15/03/2022 | <Link to="">Admin</Link></p>
                                                </div>
                                                <h5 className="blog-title">
                                                    <Link to="">Lotto Winner Offering Up Money To Any Man That Will Date Her</Link>
                                                </h5>
                                            </div>
                                        </div>

                                        <div className="blog-post-item">
                                            <figure className="blog-thumb">
                                                <Link to="">
                                                    <img src="/assets/img/blog/blog-img4.jpg" alt="blogs" />
                                                </Link>
                                            </figure>
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <p>25/06/2022 | <Link to="">Admin</Link></p>
                                                </div>
                                                <h5 className="blog-title">
                                                    <Link to="">People are Willing Lie When Comes Money, According to Research</Link>
                                                </h5>
                                            </div>
                                        </div>

                                        <div className="blog-post-item">
                                            <figure className="blog-thumb">
                                                <Link to="">
                                                    <img src="/assets/img/blog/blog-img5.jpg" alt="blogs" />
                                                </Link>
                                            </figure>
                                            <div className="blog-content">
                                                <div className="blog-meta">
                                                    <p>25/03/2022 | <Link to="#">Admin</Link></p>
                                                </div>
                                                <h5 className="blog-title">
                                                    <Link to="">romantic Love Stories Of Hollywoodâ€™s Biggest Celebrities</Link>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="brand-logo section-padding pt-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="brand-logo-carousel slick-row-10 slick-arrow-style">
                                        <div className="brand-item">
                                            <Link to="">
                                                <img src="/assets/img/brand/1.png" alt="" />
                                            </Link>
                                        </div>

                                        <div className="brand-item">
                                            <Link to="">
                                                <img src="/assets/img/brand/2.png" alt="" />
                                            </Link>
                                        </div>

                                        <div className="brand-item">
                                            <Link to="">
                                                <img src="/assets/img/brand/3.png" alt="" />
                                            </Link>
                                        </div>

                                        <div className="brand-item">
                                            <Link to="">
                                                <img src="/assets/img/brand/4.png" alt="" />
                                            </Link>
                                        </div>

                                        <div className="brand-item">
                                            <Link to="">
                                                <img src="/assets/img/brand/5.png" alt="" />
                                            </Link>
                                        </div>

                                        <div className="brand-item">
                                            <Link to="">
                                                <img src="/assets/img/brand/6.png" alt="" />
                                            </Link>
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

export default Home
