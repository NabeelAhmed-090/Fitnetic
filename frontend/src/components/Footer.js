import React from 'react'
import { Row, Col, Container } from "react-bootstrap"

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#FEE715CF", minHeight: "40vh" }}>
            <Container>
                <Row >
                    <Col style={{ marginTop: "20px" }} md={4} sm={12} lg={4}>
                        <h3><b>Fitnetic</b></h3>
                        <p style={{ marginTop: "20px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, accusantium atque suscipit odio placeat temporibus maxime, eligendi dolor amet veniam, consequuntur quas quasi. Distinctio, quos.</p>
                    </Col>
                    <Col style={{ marginTop: "20px", textAlign: "center" }} md={4} sm={12} lg={4}>
                        <h3><b>Contact Us</b></h3>
                        <Row style={{ marginTop: "20px" }}>
                            <Col md={12} lg={12} sm={12}>
                                <pre>
                                    <i class="fa-solid fa-phone"></i> <b>  : 0300 1234567     </b>
                                </pre>
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} lg={12} sm={12}>
                                <pre>
                                    <i class="fa-solid fa-at"></i> <b>  : test@gmail.com   </b>
                                </pre>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={12} sm={12}>
                                <pre>
                                    <i class="fa-solid fa-envelope"></i> <b>  : PO-BOX 123 Lahore</b>
                                </pre>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ marginTop: "20px", textAlign: "center" }} md={4} sm={12} lg={4}>
                        <h3><b>Connect With Us</b></h3>
                        <Row style={{ textAlign: "center", marginTop: "20px" }}>
                            <Col md={4} lg={4} sm={4}>
                                <i class="fa-brands fa-facebook fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i class="fa-brands fa-twitter fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i class="fa-brands fa-instagram fa-2x"></i>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: "center", marginTop: "20px" }}>
                            <Col md={4} lg={4} sm={4}>
                                <i class="fa-brands fa-snapchat fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i class="fa-brands fa-linkedin fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i class="fa-brands fa-github fa-2x"></i>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container >
        </div >
    )
}

export default Footer