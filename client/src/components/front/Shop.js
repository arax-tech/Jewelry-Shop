import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from 'react-redux';
import { getShopProducts } from '../../redux/actions/WebSiteAction';
import Loading from '../layouts/include/Loading'
import Product from './Product';
import { Slider } from '@mui/material';


const Shop = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 1000]);
    const [category, setCategory] = useState();
    const [ratings, setRatings] = useState(0);
    const priceFilterHander = (event, newPrice) => {
        setPrice(newPrice);
    }


    const setCurrentPageNumber = (event) => {
        setCurrentPage(event);
    }


    const { loading, shopProducts, resultPerPage, productsCount, shopCategories } = useSelector((state) => state.website);

    const [keyword, setKeyword] = useState();






    useEffect(() => {
        keyword && keyword.length > 4 ?
            navigate(`/product/search/${keyword}`)
            :
            navigate(`/shop`);

        dispatch(getShopProducts(keyword && keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, navigate])
    return (

        loading ? <Loading /> :
            <App>
                <MetaData title="Shop" />
                <main>
                    <div className="breadcrumb-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="breadcrumb-wrap">
                                        <nav aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i></Link></li>
                                                <li className="breadcrumb-item active" aria-current="page">shop</li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shop-main-wrapper section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 order-2 order-lg-1">
                                    <aside className="sidebar-wrapper">
                                        <div className="sidebar-single">
                                            <h5 className="sidebar-title">search</h5>
                                            <div className="sidebar-body">
                                                <input type="search" onChange={(event) => setKeyword(event.target.value)} className='form-control' placeholder="Search" value={keyword && keyword} />
                                            </div>
                                        </div>
                                        <div className="sidebar-single">
                                            <h5 className="sidebar-title">price</h5>
                                            <div className="sidebar-body">
                                                <Slider className='mt-4 mb-4'
                                                    value={price}
                                                    onChange={priceFilterHander}
                                                    valueLabelDisplay="on"
                                                    aria-labelledby='range-slider'
                                                    min={0}
                                                    max={1000}
                                                />
                                            </div>
                                        </div>

                                        <div className="sidebar-single">
                                            <h5 className="sidebar-title">categories</h5>
                                            <div className="sidebar-body">
                                                <ul className="shop-categories">
                                                    {
                                                        shopCategories?.map((category, index) => (

                                                            <li key={index} onClick={() => setCategory(category._id)}><Link to="">{category.name} <span>({category.number_of_product})</span></Link></li>
                                                        ))
                                                    }

                                                </ul>
                                            </div>
                                        </div>



                                        <div className="sidebar-single">
                                            <h5 className="sidebar-title">Filter By Ratings</h5>
                                            <div className="sidebar-body">
                                                <Slider className='mt-4 mb-4'
                                                    value={ratings}
                                                    onChange={(event, newRatings) => { setRatings(newRatings) }}
                                                    valueLabelDisplay="on"
                                                    aria-labelledby='continuous-slider'
                                                    min={0}
                                                    max={5}
                                                />
                                            </div>
                                        </div>
                                        <div className="sidebar-banner">
                                            <div className="img-container">
                                                <Link to="#">
                                                    <img src="/assets/img/banner/sidebar-banner.jpg" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </aside>
                                </div>


                                <div className="col-lg-9 order-1 order-lg-2">
                                    <div className="shop-product-wrapper">
                                        <div className="shop-product-wrap grid-view row mbn-30">


                                            {
                                                shopProducts && shopProducts[0] ?
                                                    shopProducts?.map((product, index) => (
                                                        <div className="col-md-4 col-sm-6">
                                                            <Product key={index} product={product} list={true} />
                                                        </div>
                                                    ))

                                                    :
                                                    <>
                                                        <h2 className='d-flex p-5 justify-content-center text-dangers'>Products not Found...</h2>
                                                    </>
                                            }



                                        </div>

                                        <div className="paginatoin-area text-center">
                                            {
                                                resultPerPage < productsCount &&
                                                <div className='d-flex aligns-items-center justify-content-center p-5'>
                                                    <Pagination
                                                        activePage={currentPage}
                                                        itemsCountPerPage={resultPerPage}
                                                        totalItemsCount={productsCount}
                                                        onChange={setCurrentPageNumber}
                                                        nextPageText="Next"
                                                        prevPageText="Previous"
                                                        firstPageText="First"
                                                        lastPageText="Last"
                                                        itemClassPrev='previous'
                                                        itemClassNext='next'
                                                        itemClass='page-item'
                                                        linkClass='page-link'
                                                        activeClass='active'
                                                    />
                                                </div>
                                            }
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

export default Shop
