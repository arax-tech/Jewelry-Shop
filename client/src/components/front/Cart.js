import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddToCart, deleteCartItem } from '../../redux/actions/CartAction'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'

const Cart = () => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (product_id, product_quantity, color, size, product_stock) => {
        const newQuantity = Number(product_quantity) + 1;
        if (product_stock < product_quantity) {
            toast.error(`Sorry we have only ${product_stock} item in stock...`, { theme: "colored" })
            return;
        } else {
            dispatch(AddToCart(product_id, newQuantity, color, size));
            toast.success("Quantity Increased Successfully...", { theme: "colored" })
        }

    }

    const decreaseQuantity = (product_id, product_quantity, color, size) => {
        const newQuantity = product_quantity - 1;
        if (1 >= product_quantity) {
            toast.error("Quantity must be grater then 1...", { theme: "colored" })
            return;
        } else {
            dispatch(AddToCart(product_id, newQuantity, color, size));
            toast.error("Quantity Decreased Successfully...", { theme: "colored" })
        }

    }

    const deleteItem = (product_id) => {
        dispatch(deleteCartItem(product_id));
        toast.error("Cart Item Deleted Successfully...", { theme: "colored" })
    }


    const subtotal = cartItems?.reduce((acc, item) => acc + item.product_quantity * item.product_price, 0);
    const shipping = 5;


    return (


        <App>
            <MetaData title="Cart" />


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
                                            <li className="breadcrumb-item active" aria-current="page">cart</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    cartItems.length > 0
                        ?
                        <>
                            <div className="cart-main-wrapper section-padding">
                                <div className="container">
                                    <div className="section-bg-color">
                                        <div className="row">
                                            <div className="col-lg-12">

                                                <div className="cart-table table-responsive">
                                                    <table className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th className="pro-thumbnail">Thumbnail</th>
                                                                <th className="pro-title">Product</th>
                                                                <th className="pro-price">Price</th>
                                                                <th className="pro-price">Color</th>
                                                                <th className="pro-price">Size</th>
                                                                <th className="pro-quantity">Quantity</th>
                                                                <th className="pro-subtotal">Total</th>
                                                                <th className="pro-remove">Remove</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                cartItems?.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td className="pro-thumbnail"><Link to={`/product/${item.product_id}`}><img className="img-fluid" src={item.product_image} alt="" /></Link></td>
                                                                        <td className="pro-title"><Link to={`/product/${item.product_id}`}>{item.product_name}</Link></td>
                                                                        <td className="pro-price"><span>${item.product_price}.00</span></td>
                                                                        <td>
                                                                            <div className="color-option">
                                                                                <ul className="color-categories">
                                                                                    <li>
                                                                                        <Link to="" className={item.product_color}></Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                        <td>{item.product_size}</td>
                                                                        <td className="pro-quantity">
                                                                            <div className="btn-group">
                                                                                <button type="button" className="btn btn-sqr" onClick={() => decreaseQuantity(item.product_id, item.product_quantity, item.product_color, item.product_size)}>
                                                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                                                </button>
                                                                                <button type="button" className="btn btn-sqr">{item.product_quantity}</button>
                                                                                <button type="button" className="btn btn-sqr" onClick={() => increaseQuantity(item.product_id, item.product_quantity, item.product_color, item.product_size, item.product_stock)}>
                                                                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                                                                </button>
                                                                            </div>



                                                                        </td>
                                                                        <td className="pro-subtotal"><span>$ {item.product_price * item.product_quantity}.00</span></td>
                                                                        <td className="pro-remove">
                                                                            <Link onClick={() => deleteItem(item.product_id)} to=""><i className="fa fa-trash-o"></i></Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5 ml-auto">

                                                <div className="cart-calculator-wrapper">
                                                    <div className="cart-calculate-items">
                                                        <h6>Cart Totals</h6>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <tr>
                                                                    <td>Sub Total</td>
                                                                    <td>${subtotal}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Shipping</td>
                                                                    <td>${shipping}</td>
                                                                </tr>
                                                                <tr className="total">
                                                                    <td>Grand Total</td>
                                                                    <td className="total-amount">${subtotal + shipping}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <Link to="/auth?redirect=/checkout" className="btn btn-sqr d-block">Proceed Checkout</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <section className="mt-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="headline text-center mb-5">
                                                <h2 className="pb-3 position-relative d-inline-block">Yout cart is empty...</h2>
                                                <br /> <br />
                                                <Link className="btn btn-sqr btn-lg" to="/shop">Continue Shopping</Link>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </section>
                        </>
                }
            </main>

        </App>
    )
}

export default Cart
