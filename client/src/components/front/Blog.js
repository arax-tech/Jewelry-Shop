import React from 'react'
import { Link } from 'react-router-dom'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'

const Blog = () => {

    return (
        <App>
            <MetaData title="Blog" />


            <main>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="index.html"><i className="fa fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">blog left sidebar</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blog-main-wrapper section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                <aside className="blog-sidebar-wrapper">
                                    <div className="blog-sidebar">
                                        <h5 className="title">search</h5>
                                        <div className="sidebar-serch-form">
                                            <form action="#">
                                                <input type="text" className="search-field" placeholder="search here" />
                                                <button type="submit" className="search-btn"><i className="fa fa-search"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="blog-sidebar">
                                        <h5 className="title">categories</h5>
                                        <ul className="blog-archive blog-category">
                                            <li><Link to="#">Barber (10)</Link></li>
                                            <li><Link to="#">fashion (08)</Link></li>
                                            <li><Link to="#">handbag (07)</Link></li>
                                            <li><Link to="#">Jewelry (14)</Link></li>
                                            <li><Link to="#">food (10)</Link></li>
                                        </ul>
                                    </div>
                                    <div className="blog-sidebar">
                                        <h5 className="title">Blog Archives</h5>
                                        <ul className="blog-archive">
                                            <li><Link to="#">January (10)</Link></li>
                                            <li><Link to="#">February (08)</Link></li>
                                            <li><Link to="#">March (07)</Link></li>
                                            <li><Link to="#">April (14)</Link></li>
                                            <li><Link to="#">May (10)</Link></li>
                                        </ul>
                                    </div>
                                    <div className="blog-sidebar">
                                        <h5 className="title">recent post</h5>
                                        <div className="recent-post">
                                            <div className="recent-post-item">
                                                <figure className="product-thumb">
                                                    <Link to="blog-details.html">
                                                        <img src="assets/img/blog/blog-img1.jpg" alt="blog" />
                                                    </Link>
                                                </figure>
                                                <div className="recent-post-description">
                                                    <div className="product-name">
                                                        <h6><Link to="blog-details.html">Auctor gravida enim</Link></h6>
                                                        <p>march 10 2019</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="recent-post-item">
                                                <figure className="product-thumb">
                                                    <Link to="blog-details.html">
                                                        <img src="assets/img/blog/blog-img2.jpg" alt="blog" />
                                                    </Link>
                                                </figure>
                                                <div className="recent-post-description">
                                                    <div className="product-name">
                                                        <h6><Link to="blog-details.html">gravida auctor dnim</Link></h6>
                                                        <p>march 18 2019</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="recent-post-item">
                                                <figure className="product-thumb">
                                                    <Link to="blog-details.html">
                                                        <img src="assets/img/blog/blog-img3.jpg" alt="blog" />
                                                    </Link>
                                                </figure>
                                                <div className="recent-post-description">
                                                    <div className="product-name">
                                                        <h6><Link to="blog-details.html">enim auctor gravida</Link></h6>
                                                        <p>march 14 2019</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-sidebar">
                                        <h5 className="title">Tags</h5>
                                        <ul className="blog-tags">
                                            <li><Link to="#">camera</Link></li>
                                            <li><Link to="#">computer</Link></li>
                                            <li><Link to="#">bag</Link></li>
                                            <li><Link to="#">watch</Link></li>
                                            <li><Link to="#">smartphone</Link></li>
                                            <li><Link to="#">shoes</Link></li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                <div className="blog-item-wrapper">
                                    <div className="row mbn-30">
                                        <div className="col-md-6">
                                            <div className="blog-post-item mb-30">
                                                <figure className="blog-thumb">
                                                    <Link to="blog-details.html">
                                                        <img src="assets/img/blog/blog-img1.jpg" alt="blog" />
                                                    </Link>
                                                </figure>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <p>10/04/2019 | <Link to="#">Corano</Link></p>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <Link to="blog-details.html">Celebrity Daughter Opens Up About Having Her Eye Color Changed</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-post-item mb-30">
                                                <figure className="blog-thumb">
                                                    <div className="blog-carousel-2 slick-row-15 slick-arrow-style slick-dot-style">
                                                        <div className="blog-single-slide">
                                                            <Link to="blog-details.html">
                                                                <img src="assets/img/blog/blog-img5.jpg" alt="blog" />
                                                            </Link>
                                                        </div>
                                                        <div className="blog-single-slide">
                                                            <Link to="blog-details.html">
                                                                <img src="assets/img/blog/blog-img4.jpg" alt="blog" />
                                                            </Link>
                                                        </div>
                                                        <div className="blog-single-slide">
                                                            <Link to="blog-details.html">
                                                                <img src="assets/img/blog/blog-img3.jpg" alt="blog" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </figure>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <p>12/04/2019 | <Link to="#">Corano</Link></p>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <Link to="blog-details.html">Lotto Winner Offering Up Money To Any Man That Will Date Her</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-post-item mb-30">
                                                <figure className="blog-thumb ratio ratio-16x9">
                                                    <iframe src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/501298839&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true" title='asdasd'></iframe>
                                                </figure>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <p>15/04/2019 | <Link to="#">Corano</Link></p>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <Link to="blog-details.html">Children Left Home Alone For 4 Days In TV series Experiment</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-post-item mb-30">
                                                <figure className="blog-thumb ratio ratio-16x9">
                                                    <iframe src="https://www.youtube.com/embed/4qNHr0W6F0o" title='asd' allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                                </figure>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <p>05/04/2019 | <Link to="#">Corano</Link></p>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <Link to="blog-details.html">People are Willing Lie When Comes Money, According to Research</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-post-item mb-30">
                                                <figure className="blog-thumb">
                                                    <Link to="blog-details.html">
                                                        <img src="assets/img/blog/blog-img5.jpg" alt="blog" />
                                                    </Link>
                                                </figure>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <p>02/04/2019 | <Link to="#">Corano</Link></p>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <Link to="blog-details.html">romantic Love Stories Of Hollywood’s Biggest Celebrities</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="blog-post-item mb-30">
                                                <figure className="blog-thumb">
                                                    <Link to="blog-details.html">
                                                        <img src="assets/img/blog/blog-img3.jpg" alt="blog" />
                                                    </Link>
                                                </figure>
                                                <div className="blog-content">
                                                    <div className="blog-meta">
                                                        <p>25/03/2019 | <Link to="#">Corano</Link></p>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <Link to="blog-details.html">Celebrity Daughter Opens Up About Having Her Eye Color Changed</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="paginatoin-area text-center">
                                        <ul className="pagination-box">
                                            <li><Link className="previous" to="#"><i className="pe-7s-angle-left"></i></Link></li>
                                            <li className="active"><Link to="#">1</Link></li>
                                            <li><Link to="#">2</Link></li>
                                            <li><Link to="#">3</Link></li>
                                            <li><Link className="next" to="#"><i className="pe-7s-angle-right"></i></Link></li>
                                        </ul>
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

export default Blog

