import React from 'react'
import { Link } from 'react-router-dom'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'

const About = () => {

    return (
        <App>
            <MetaData title="About" />

            <main>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">About us</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="about-us section-padding">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5">
                                <div className="about-thumb">
                                    <img src="assets/img/about/about.jpg" alt="about thumb" />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="about-content">
                                    <h2 className="about-title">About Us</h2>
                                    <h5 className="about-sub-title">
                                        Founded in 1986, I.D. Jewelry, LLC, a family owned & operated business has become a house-hold name in states all over the USA as well as countries all over the world.
                                    </h5>
                                    <p>For those that rather the full immersion of the in store experience we welcome your company and look forward to meeting you face to face. Being located in the 47 street diamond district, known to be the largest diamond.</p>
                                    <p>Based in the heart of New York’s Diamond District, also known as the NYC diamond district, I. D. Jewelry has some of the most competitively priced in the market. It is our goal to supply our clients.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="choosing-area section-padding pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title text-center">
                                    <h2 className="title">Why Choose Us</h2>
                                    <p>Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mbn-30">
                            <div className="col-lg-4 col-md-4">
                                <div className="single-choose-item text-center mb-30">
                                    <i className="fa fa-globe"></i>
                                    <h4>free shipping</h4>
                                    <p>Amadea Shop is a very slick and clean e-commerce template with endless possibilities.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="single-choose-item text-center mb-30">
                                    <i className="fa fa-plane"></i>
                                    <h4>fast delivery</h4>
                                    <p>Amadea Shop is a very slick and clean e-commerce template with endless possibilities.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="single-choose-item text-center mb-30">
                                    <i className="fa fa-comments"></i>
                                    <h4>customers support</h4>
                                    <p>Amadea Shop is a very slick and clean e-commerce template with endless possibilities.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="team-area section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-title text-center">
                                    <h2 className="title">Our Team</h2>
                                    <p>Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mbn-30">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="team-member mb-30">
                                    <div className="team-thumb">
                                        <img src="assets/img/team/team_member_1.jpg" alt="" />
                                        <div className="team-social">
                                            <Link to="#"><i className="fa fa-facebook"></i></Link>
                                            <Link to="#"><i className="fa fa-twitter"></i></Link>
                                            <Link to="#"><i className="fa fa-linkedin"></i></Link>
                                            <Link to="#"><i className="fa fa-google-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="team-content text-center">
                                        <h6 className="team-member-name">Jonathan Scott</h6>
                                        <p>CEO</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="team-member mb-30">
                                    <div className="team-thumb">
                                        <img src="assets/img/team/team_member_2.jpg" alt="" />
                                        <div className="team-social">
                                            <Link to="#"><i className="fa fa-facebook"></i></Link>
                                            <Link to="#"><i className="fa fa-twitter"></i></Link>
                                            <Link to="#"><i className="fa fa-linkedin"></i></Link>
                                            <Link to="#"><i className="fa fa-google-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="team-content text-center">
                                        <h6 className="team-member-name">oliver bastin</h6>
                                        <p>Designer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="team-member mb-30">
                                    <div className="team-thumb">
                                        <img src="assets/img/team/team_member_3.jpg" alt="" />
                                        <div className="team-social">
                                            <Link to="#"><i className="fa fa-facebook"></i></Link>
                                            <Link to="#"><i className="fa fa-twitter"></i></Link>
                                            <Link to="#"><i className="fa fa-linkedin"></i></Link>
                                            <Link to="#"><i className="fa fa-google-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="team-content text-center">
                                        <h6 className="team-member-name">erik jonson</h6>
                                        <p>HR</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="team-member mb-30">
                                    <div className="team-thumb img-full">
                                        <img src="assets/img/team/team_member_4.jpg" alt="" />
                                        <div className="team-social">
                                            <Link to="#"><i className="fa fa-facebook"></i></Link>
                                            <Link to="#"><i className="fa fa-twitter"></i></Link>
                                            <Link to="#"><i className="fa fa-linkedin"></i></Link>
                                            <Link to="#"><i className="fa fa-google-plus"></i></Link>
                                        </div>
                                    </div>
                                    <div className="team-content text-center">
                                        <h6 className="team-member-name">jon doe</h6>
                                        <p>Marketing Officer</p>
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

export default About

