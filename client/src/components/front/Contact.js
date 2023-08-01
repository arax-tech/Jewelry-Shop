import React from 'react'
import { Link } from 'react-router-dom'
import App from '../layouts/App'
import MetaData from '../layouts/include/MetaData'

const Contact = () => {

    return (
        <App>
            <MetaData title="Contact" />
            <main>
                <div className="breadcrumb-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">contact us</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="contact-area section-padding pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="contact-message">
                                    <h4 className="contact-title">Contact Us</h4>
                                    <form id="contact-form" action="https://whizthemes.com/mail-php/genger/mail.php" method="post" className="contact-form">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <input name="first_name" placeholder="Name *" type="text" required />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <input name="phone" placeholder="Phone *" type="text" required />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <input name="email_address" placeholder="Email *" type="text" required />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <input name="contact_subject" placeholder="Subject *" type="text" />
                                            </div>
                                            <div className="col-12">
                                                <div className="contact2-textarea text-center">
                                                    <textarea placeholder="Message *" name="message" className="form-control2" required></textarea>
                                                </div>
                                                <div className="contact-btn">
                                                    <button className="btn btn-sqr" type="submit">Send Message</button>
                                                </div>
                                            </div>
                                            <div className="col-12 d-flex justify-content-center">
                                                <p className="form-messege"></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-info">
                                    <h4 className="contact-title">Contact Us</h4>
                                    <p>Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum
                                        est notare quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum
                                        formas human.</p>
                                    <ul>
                                        <li><i className="fa fa-fax"></i> Address : No 40 Baria Sreet 133/2 NewYork City</li>
                                        <li><i className="fa fa-phone"></i> E-mail: info@yourdomain.com</li>
                                        <li><i className="fa fa-envelope-o"></i> +88013245657</li>
                                    </ul>
                                    <div className="working-time">
                                        <h6>Working Hours</h6>
                                        <p><span>Monday – Saturday:</span>08AM – 22PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="map-area section-padding">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192866!2d77.06889754725779!3d28.52758200617606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1643032955472!5m2!1sen!2sus" allowfullscreen="" loading="lazy" title='sdfkjh' style={{ height: "450px", width: "100%" }}></iframe>
                </div>
            </main>





        </App>
    )
}

export default Contact

