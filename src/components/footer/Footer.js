import React from 'react';
import '../footer/Footer.css'
import {FaFacebookF,FaYoutube,FaTwitter} from 'react-icons/fa';


function Footer() {
    return (
        <section className="footer-cont">

            <div className="position-cont-row footer-row">

                <div className="social-cont">

                    <a className="footer-a"
                       href="https://www.facebook.com/themoviedb"
                       target="_blank"
                       rel="noopener noreferrer">

                        <FaFacebookF className="icon social"/>

                    </a>

                    <a className="footer-a"
                       href="https://www.youtube.com/channel/UCuI8JXIbX8diMPrzv3yRP6g"
                       target="_blank"
                       rel="noopener noreferrer">

                        <FaYoutube className="icon social"/>

                    </a>

                    <a className="footer-a"
                       href="https://twitter.com/themoviedb"
                       target="_blank" rel="noopener noreferrer">

                        <FaTwitter className="icon social"/>

                    </a>

                </div>

                <div className="contact-cont">

                    <p className=" footer-txt footer-contact-txt">CONTACT US:</p>

                    <p className="footer-txt">T: 0031 6123 45 67 89</p>

                    <a className="footer-txt footer-email " href="mailto:thieulee@hotmail.com">
                        Email Moviestars
                    </a>

                </div>

            </div>

        </section>
    );
}

export default Footer;