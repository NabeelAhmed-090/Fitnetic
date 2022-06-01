import React from 'react'
import { Row, Col, Container } from "react-bootstrap"

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#FEE715CF", minHeight: "30vh" }}>
            <Container>
                <Row >
                    <Col style={{ marginTop: "20px" }} md={5} sm={12} lg={5}>
                        <h4 className="boldFonts"><b>Fitnetic</b></h4>
                        <p style={{ marginTop: "20px" }} className="lightFonts">
                            Fitnetic provides you with complete set of workout and diet plans of
                            different types as per your requirements. It will allow you to
                            choose a specific fitness goal and based on this fitness goal,
                            suitable exercises and meal plans will be suggested to you.
                        </p>
                    </Col>
                    <Col style={{ marginTop: "20px", textAlign: "left" }} md={3} sm={3} lg={3}>
                        <h4 className="boldFonts"><b>Contact Us</b></h4>
                        <Row style={{ marginTop: "20px" }} className="lightFonts">
                            <Col md={12} lg={12} sm={12}>
                                <p>
                                    <i className="fa-solid fa-phone"></i> <b>:       0300 1234567     </b>
                                </p>
                            </Col>
                        </Row>
                        <Row className="lightFonts">
                            <Col md={12} lg={12} sm={12}>
                                <p>
                                    <i className="fa-solid fa-at"></i> <b>:   fitnetic@gmail.com   </b>
                                </p>
                            </Col>
                        </Row>
                        <Row className="lightFonts">
                            <Col md={12} lg={12} sm={12}>
                                <p>
                                    <i className="fa-solid fa-envelope"></i> <b>:       PO-BOX 123 Lahore</b>
                                </p>
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