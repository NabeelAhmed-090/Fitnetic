import React from 'react'
import { Row, Col, Container } from "react-bootstrap"

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#FEE715CF", minHeight: "30vh" }}>
            <Container>
                <Row >
                    <Col style={{ marginTop: "20px" }} md={4} sm={12} lg={4}>
                        <h4 className="boldFonts"><b>Fitnetic</b></h4>
                        <p style={{ marginTop: "20px" }} className="lightFonts">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, accusantium atque suscipit odio placeat temporibus maxime, eligendi dolor amet veniam, consequuntur quas quasi. Distinctio, quos.</p>
                    </Col>
                    <Col style={{ marginTop: "20px", textAlign: "center" }} md={4} sm={12} lg={4}>
                        <h4 className="boldFonts"><b>Contact Us</b></h4>
                        <Row style={{ marginTop: "20px" }} className="lightFonts">
                            <Col md={12} lg={12} sm={12}>
                                <pre>
                                    <i className="fa-solid fa-phone"></i> <b>  : 0300 1234567     </b>
                                </pre>
                            </Col>
                        </Row>
                        <Row className="lightFonts">
                            <Col md={12} lg={12} sm={12}>
                                <pre>
                                    <i className="fa-solid fa-at"></i> <b>  : test@gmail.com   </b>
                                </pre>
                            </Col>
                        </Row>
                        <Row className="lightFonts">
                            <Col md={12} lg={12} sm={12}>
                                <pre>
                                    <i className="fa-solid fa-envelope"></i> <b>  : PO-BOX 123 Lahore</b>
                                </pre>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ marginTop: "20px", textAlign: "center" }} md={4} sm={12} lg={4}>
                        <h4 className="boldFonts"><b>Connect With Us</b></h4>
                        <Row className="lightFonts" style={{ textAlign: "center", marginTop: "20px" }}>
                            <Col md={4} lg={4} sm={4}>
                                <i className="fa-brands fa-facebook fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i className="fa-brands fa-twitter fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i className="fa-brands fa-instagram fa-2x"></i>
                            </Col>
                        </Row>
                        <Row className="lightFonts" style={{ textAlign: "center", marginTop: "20px" }}>
                            <Col md={4} lg={4} sm={4}>
                                <i className="fa-brands fa-snapchat fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i className="fa-brands fa-linkedin fa-2x"></i>
                            </Col>
                            <Col md={4} lg={4} sm={4}>
                                <i className="fa-brands fa-github fa-2x"></i>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}

export default Footer