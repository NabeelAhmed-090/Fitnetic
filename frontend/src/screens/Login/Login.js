import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/userActions'
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap'
import img1 from '../../Image/img1.jpg'
import img2 from '../../Image/img2.jpg'
import img3 from '../../Image/img3.jpg'
import './Login.css'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <Row style={{ marginBottom: "0" }}>
                <Col md={6} sm={12} lg={6}>
                    <Carousel>
                        <Carousel.Item className="carousel-item">
                            <div style={{ height: "90vh" }}>
                                <img
                                    className="d-block w-100"
                                    src={img1}
                                    alt="First slide"
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </div>
                            <Carousel.Caption style={{ color: "black" }}>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ height: "90vh" }}>
                                <img
                                    className="d-block w-100"
                                    src={img2}
                                    alt="First slide"
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </div>

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ height: "90vh" }}>
                                <img
                                    className="d-block w-100"
                                    src={img3}
                                    alt="First slide"
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </div>
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col md={6} sm={12} lg={6} style={{ display: 'flex', justifyContent: 'center', paddingTop: "20vh", minHeight: "45vh" }}>
                    <Container style={{ minWidth: "35vw", maxWidth: "80%" }} className="shadow p-3 mb-5 bg-white rounded">
                        <Form >
                            <Row>
                                <Col style={{ textAlign: "center", justifyContent: 'center' }}>
                                    <h2>Login</h2>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "10vh" }}>
                                <Col md={12} lg={12} sm={12}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000", outline: "none" }} type="text" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} lg={12} sm={12}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
                                    <Button className="btn-block w-100 p-2 my-2" variant="dark" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }} onClick={() => {
                                        dispatch(login(email, password))
                                    }}>
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                            <Row >
                                <Col md={12} sm={12} lg={12} style={{ textAlign: "center" }}>
                                    <Form.Text className="text-muted">
                                        If you don't have an account. Click <a href="/api/users/signup">here</a> to sign up.
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </>
    )
}

export default Login