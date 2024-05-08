import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiYoutube } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";

function Footer() {
    return (
        <Container fluid>
            <div className="main12">
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <div class="widget subscribe no-box">
                            <h5 class="widget-title">Product Name<span></span></h5>
                            <p>About the company, little discription will goes here.. </p>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <div class="widget no-box">
                            <h5 class="widget-title">Links<span></span></h5>
                            <ul class="thumbnail-widget">
                                <li>
                                    <div class="thumb-content"><a href="#">Get Started</a></div>
                                </li>
                                <li>
                                    <div class="thumb-content"><a href="#">Top Leaders</a></div>
                                </li>
                                <li>
                                    <div class="thumb-content"><a href="#">Success Stories</a></div>
                                </li>
                                <li>
                                    <div class="thumb-content"><a href="#">Event/Tickets</a></div>
                                </li>
                                <li>
                                    <div class="thumb-content"><a href="#">News</a></div>
                                </li>
                                <li>
                                    <div class="thumb-content"><a href="#.">About</a></div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <div class="widget no-box">
                            <h5 class="widget-title">Get Started<span></span></h5>
                            <p>Get access to your full Training and Marketing Suite.</p>
                            <a class="btn" href="https://bit.ly/3m9avif" target="_blank">Subscribe Now</a>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <div class="widget no-box">
                            <h5 class="widget-title">Contact Us<span></span></h5>

                            <p><a href="mailto:info@domain.com" title="glorythemes">info@domain.com</a></p>
                            <ul class="social-footer2">
                                <CiYoutube />
                                <CiFacebook />
                                <CiTwitter />
                                <CiCamera />
                            </ul>
                        </div>
                    </Col>

                </Row>
            </div>
        </Container>
    );
}

export default Footer;