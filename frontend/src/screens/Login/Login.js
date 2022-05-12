import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../actions/userActions'
import { adminLoginFunc } from '../../actions/adminActions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import loginPNG from '../../Image/Login.png'
import './Login.css'

const Login = () => {
    let history = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const adminLogin = useSelector((state) => state.adminLogin)
    const { userInfo } = userLogin
    const { adminInfo } = adminLogin
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (adminInfo) {
            history("/api/admin")
        }
        if (userInfo) {
            history("/api/homepage")
        }
    }, [dispatch, history, userInfo, adminInfo])

    return (
        <>
            <Row style={{ paddingBottom: "0" }}>
                <Col md={6} sm={12} lg={6} style={{ marginBottom: "0" }}>
                    {/* <Carousel>
                        <Carousel.Item className="carousel-item">
                            <div style={{ height: "100vh" }}>
                                <img
                                    className="d-block w-100"
                                    src={loginPNG}
                                    alt="First slide"
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </div>
                            <Carousel.Caption style={{ color: "black" }}>
                                <h2><b>First slide label</b></h2>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div style={{ height: "100vh" }}>
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
                            <div style={{ height: "100vh" }}>
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
                    </Carousel> */}
                    <div style={{ height: "100vh" }}>
                        <img
                            className="d-block w-100"
                            src={loginPNG}
                            alt="First slide"
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                </Col>
                <Col md={6} sm={12} lg={6} style={{ display: 'flex', justifyContent: 'center', paddingTop: "20vh", minHeight: "45vh" }}>
                    <Container style={{ minWidth: "35vw", maxWidth: "80%", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-5 rounded">
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
                                        if (email === "nabeel@gmail.com") {
                                            dispatch(adminLoginFunc(email, password))
                                        }
                                        else {
                                            dispatch(login(email, password))
                                        }
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