import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import { signup } from '../../actions/userActions'
import signup1PNG from '../../Image/signup1.png'
import signup2PNG from '../../Image/signup2.png'
import signup3PNG from '../../Image/signup3.png'

const Signup = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [password, setPassword] = useState("")
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [image, setImage] = useState("")

    let history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history("/api/homepage")
        }
    }, [dispatch, history, userInfo])

    return (
        <>

            <Carousel>
                <Carousel.Item className="carousel-item">
                    <div style={{ height: "80vh" }}>
                        <img
                            className="d-block w-100"
                            src={signup1PNG}
                            alt="First slide"
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                    <Carousel.Caption style={{ color: "black" }}>
                        <h2><b>First slide label</b></h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <div style={{ height: "80vh" }}>
                        <img
                            className="d-block w-100"
                            src={signup2PNG}
                            alt="First slide"
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                    <Carousel.Caption style={{ color: "black" }}>
                        <h2><b>First slide label</b></h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                    <div style={{ height: "80vh" }}>
                        <img
                            className="d-block w-100"
                            src={signup3PNG}
                            alt="First slide"
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                    <Carousel.Caption style={{ color: "black" }}>
                        <h2><b>First slide label</b></h2>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container style={{ marginTop: "5vh" }}>
                <Row>
                    <Col md={12} sm={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Container style={{ width: "50vw", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-5 rounded">
                            <Form>
                                <Row>
                                    <Col md={12} lg={12} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000", outline: "none" }} type="email" placeholder="Enter Email" onChange={(event) => setEmail(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000", outline: "none" }} type="text" placeholder="Enter Name" onChange={(event) => setName(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicHeight">
                                            <Form.Label>Height</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="number" placeholder="Enter Height" onChange={(event) => setHeight(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicAge">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="number" placeholder="Enter Age" onChange={(event) => setAge(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicWeight">
                                            <Form.Label>Weight</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="number" placeholder="Enter Weight " onChange={(event) => setWeight(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicImage">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="text" placeholder="Enter Image Source" onChange={(event) => setImage(event.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
                                        <Button variant="dark" type="submit" style={{ marginLeft: "auto", marginTop: "5vh" }}
                                            onClick={() => {
                                                dispatch(signup(name, age, password, weight, email, height, image))
                                            }}>
                                            Signup
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Signup