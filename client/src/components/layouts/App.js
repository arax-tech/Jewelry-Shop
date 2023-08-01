import React, { useEffect } from 'react'
import Footer from './include/Footer'
import Header from './include/Header'


const App = ({ children }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "/assets/js/vendor/modernizr-3.6.0.min.js";
        script.src = "/assets/js/vendor/jquery-3.6.0.min.js";
        script.src = "/assets/js/vendor/bootstrap.bundle.min.js";
        script.src = "/assets/js/plugins/slick.min.js";
        script.src = "/assets/js/plugins/countdown.min.js";
        script.src = "/assets/js/plugins/jqueryui.min.js";
        script.src = "/assets/js/plugins/image-zoom.min.js";
        script.src = "/assets/js/plugins/imagesloaded.pkgd.min.js";
        script.src = "/assets/js/plugins/ajaxchimp.js";
        script.src = "/assets/js/plugins/ajax-mail.js";
        script.src = "/assets/js/main.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [children]);

    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
        </React.Fragment >
    )
}

export default App
