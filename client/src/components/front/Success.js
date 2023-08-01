import React from 'react'
import { Link } from 'react-router-dom'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'

const Success = () => {
    return (
        <App>
            <MetaData title="Success" />
            <main>
                <section className="vh-100 mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="headline text-center mb-5">
                                    <span style={{ padding: "10px", color: "#c29958", fontSize: "90px" }} className='fa fa-check-circle'></span> <br />
                                    <h2 className="pb-3 position-relative d-inline-block">Your Order has been Placed Successfully...</h2>
                                    <br /> <br />
                                    <Link className="btn btn-sqr" to="/user/order">My Orders</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


        </App>
    )
}

export default Success
