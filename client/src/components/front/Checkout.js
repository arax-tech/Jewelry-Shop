import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'

import { Country, State, City } from 'country-state-city'
import { placeOrderFunction } from '../../redux/actions/WebSiteAction'
import { toast } from 'react-toastify'
import { PLACE_ORDER_RESET } from '../../redux/constants/WebSiteConstant'

const Checkout = () => {

    const paypal = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { message, isPlaced } = useSelector((state) => state.website);



    useEffect(() => {
        if (cartItems.length < 1) {
            navigate("/cart");
        }
    }, [navigate, cartItems])

    const [phone, setPhone] = useState(null);
    const [postCode, setPostCode] = useState(null);
    const [address, setAddress] = useState(null);
    const [country, setCountry] = useState(null);
    const [state, setState] = useState(null);
    const [city, setCity] = useState(null);
    const [paymentMothod, setPaymentMothod] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("UnPaid");

    const [paymentInfo, setPaymentInfo] = useState({});


    const subtotal = cartItems.reduce((acc, item) => acc + item.product_quantity * item.product_price, 0);
    const shipping = 5;
    const grandTotal = subtotal + shipping;






    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Jewlery Shop - Checkout",
                                amount: {
                                    currency_code: "USD",
                                    value: grandTotal,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const paypalOrder = await actions.order.capture();
                    setPaymentInfo(paypalOrder);
                    setPaymentMothod("PayPal");
                    setPaymentStatus("Paid");
                    toast.success("PayPal Payment Done Successfully...", { theme: "colored" })

                },
                onError: (err) => {
                    toast.error("Error occured please check console...", { theme: "colored" })
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, [grandTotal]);


    const paymentId = paymentInfo.id;
    const paymentStatusPaypal = paymentInfo.status;
    const paymentCreatedTime = paymentInfo.create_time;
    const paymentInfoJson = JSON.stringify(paymentInfo);



    const order = {
        shippingInfo: {
            phone: phone,
            postCode: postCode,
            address: address,
            country: country,
            state: state,
            city: city
        },
        orderedItems: cartItems && cartItems.map((item) => (
            {
                product_id: item.product_id,
                product_name: item.product_name,
                product_price: item.product_price,
                product_quantity: item.product_quantity,
                product_size: item.product_size,
                product_color: item.product_color,
                product_image: item.product_image
            }
        )),
        paymentInfo: {
            id: paymentId,
            amount: grandTotal,
            type: paymentMothod,
            status: paymentStatusPaypal,
            create_time: paymentCreatedTime,
            paymentJson: paymentInfoJson,
        },
        subTotal: subtotal,
        shippingPrice: shipping,
        grandTotal: grandTotal,

    };

    useEffect(() => {

        if (isPlaced && isPlaced === true) {
            toast.success(message, { theme: "colored" });
            localStorage.removeItem("cartItems");
            navigate("/success")
            dispatch({ type: PLACE_ORDER_RESET });
        }
    }, [dispatch, navigate, isPlaced, message])


    const placeOrder = (event) => {
        event.preventDefault()
        if (paymentStatus === "UnPaid") {
            toast.error("Please make payment first...", { theme: "colored" });
        } else {
            dispatch(placeOrderFunction(order));
        }

    }

    return (


        <App>
            <MetaData title="Checkout" />


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
                                            <li className="breadcrumb-item active" aria-current="page">checkout</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="checkout-page-wrapper section-padding">
                    <div className="container">

                        <form className="row" onSubmit={placeOrder} method="POST">
                            <div className="col-lg-6">
                                <div className="checkout-billing-details-wrap">
                                    <h5 className="checkout-title">Billing Details</h5>
                                    <div className="billing-form-wrap">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="single-input-item">
                                                    <label className="required">Name</label>
                                                    <input type="text" value={user.name} disabled />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="single-input-item">
                                                    <label className="required">Email</label>
                                                    <input type="text" value={user.email} disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="single-input-item">
                                                    <label className="required">phone</label>
                                                    <input type="text" name='phone' value={phone} onChange={e => setPhone(e.target.value)} required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="single-input-item">
                                                    <label className="required">Post Code</label>
                                                    <input type="text" name='phone' value={postCode} onChange={e => setPostCode(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>



                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="single-input-item">
                                                    <label className="required">Country</label>
                                                    <select value={country} onChange={(event) => setCountry(event.target.value)} required>
                                                        <option selected disabled value="">Select Country</option>
                                                        {
                                                            Country && Country.getAllCountries().map((country) => (
                                                                <option value={country.isoCode}>{country.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="single-input-item">
                                                    <label className="required">State</label>
                                                    <select value={state} name="state" onChange={(event) => setState(event.target.value)} required>
                                                        <option selected disabled value="">Select State</option>
                                                        {
                                                            State && State.getStatesOfCountry(country).map((state) => (
                                                                <option value={state.isoCode}>{state.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>


                                            <div className="col-md-4">
                                                <div className="single-input-item">
                                                    <label className="required">City</label>
                                                    <select value={city} name="city" onChange={(event) => setCity(event.target.value)} required>
                                                        <option selected disabled value="">Select City</option>
                                                        {
                                                            City && City.getCitiesOfState(country, state).map((city) => (
                                                                <option value={city.isoCode}>{city.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-input-item">
                                            <label className="required">Address</label>
                                            <input type="text" alue={address} onChange={(event) => setAddress(event.target.value)} required />
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6">
                                <div className="order-summary-details">
                                    <h5 className="checkout-title">Your Order Summary</h5>
                                    <div className="order-summary-content">

                                        <div className="order-summary-table table-responsive text-center">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Products</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartItems?.map((item, index) => (
                                                            <tr key={index}>

                                                                <td className="pro-thumbnail">
                                                                    <Link to={`/product/${item.product_id}`}>
                                                                        <img className="img-thumbnail" style={{ width: "50px" }} src={item.product_image} alt="" /> &nbsp;
                                                                        {item.product_name} <strong> × {item.product_quantity}</strong>
                                                                    </Link>
                                                                </td>



                                                                <td>$ {item.product_price * item.product_quantity}.00</td>

                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>

                                                <tfoot className=''>
                                                    <tr>
                                                        <td>Sub Total</td>
                                                        <td><strong>${subtotal}.00</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Shipping</td>
                                                        <td><strong>${shipping}.00</strong></td>
                                                    </tr>

                                                    <tr>
                                                        <td>Total Amount</td>
                                                        <td><strong>${subtotal + shipping}</strong></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        <div className="order-payment-method">

                                            <div ref={paypal}></div>
                                            <div className="summary-footer-area">
                                                <div className="custom-control custom-checkbox mb-20">
                                                    <input type="checkbox" className="custom-control-input" id="terms" required />
                                                    <label className="custom-control-label" htmlFor="terms">I have read and agree to
                                                        the website <a href="index.html">terms and conditions.</a></label>
                                                </div>
                                                <button type="submit" className="btn btn-sqr">Place Order</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </form >

                    </div >
                </div >

            </main >



        </App >
    )
}

export default Checkout
