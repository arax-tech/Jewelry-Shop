import React from 'react'
import { Link } from 'react-router-dom'
import App from '../../layouts/App'
import Sidebar from './include/Sidebar'

const Layout = ({ children }) => {
    return (
        <App>
            <main>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-account-wrapper section-padding">
                    <div className="container">
                        <div className="section-bg-color">
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="myaccount-page-wrapper">

                                        <div className="row">
                                            <Sidebar />
                                            {children}
                                        </div>
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

export default Layout
