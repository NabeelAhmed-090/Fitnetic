import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Carousel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import { signup } from '../../actions/userActions'
import signup1PNG from '../../Image/signup1.png'
import signup2PNG from '../../Image/signup2.png'
import signup3PNG from '../../Image/signup3.png'
import axios from 'axios'
import { unstable_HistoryRouter } from 'react-router-dom'

const Signup = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [password, setPassword] = useState("")
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [emailCheck, setEmailCheck] = useState(false)
    const [heightCheck, setHeightCheck] = useState(false)
    const [weightCheck, setWeightCheck] = useState(false)
    const [ageCheck, setAgeCheck] = useState(false)
    const [verifyEmail, setVerifyEmail] = useState(false)



    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const emailRegex = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$");

    const passwordFunc = (event) => {
        setPassword(event.target.value)

        if (passwordRegex.test(event.target.value)) {
            setPasswordCheck(false);
        }
        else {
            setPasswordCheck(true)
        }
    }

    const emailFunc = (event) => {
        setEmail(event.target.value)
        setVerifyEmail(false)

        if (emailRegex.test(event.target.value)) {
            setEmailCheck(false);
        }
        else {
            setEmailCheck(true)
        }
    }

    let history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const userSignup = useSelector((state) => state.userSignup)
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
                        <h2><b>A Feeble Body Weakens The Mind</b></h2>
                        <p>Our website provides you with <b>workout plans</b> to get fitter and better</p>
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
                        <h2><b>Track Your Health Progress </b></h2>
                        <p>Our website helps you <b>keep track of your health</b> and provide you the data in an interactive manner. </p>
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
                        <h2><b>Eat Health, Stay Healthy</b></h2>
                        <p>Our website provides the best <b>diet plans</b> formulated by world renowned health nutritionists. </p>
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
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000", outline: "none" }} type="email" placeholder="Enter Email" onChange={(event) => emailFunc(event)} />
                                            {emailCheck && (email.length !== 0) ?
                                                <Form.Text style={{ color: "red", fontSize: "10px" }}>
                                                    * invalid email format
                                                </Form.Text>
                                                : verifyEmail ? <Form.Text style={{ color: "red", fontSize: "10px" }}>
                                                    * email already exists
                                                </Form.Text> : ''}
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
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="password" placeholder="Password" onChange={(event) => passwordFunc(event)} />
                                            {passwordCheck && (password.length !== 0) ?
                                                <Form.Text style={{ color: "red", fontSize: "10px" }}>
                                                    * password should containt atleast 8 characters. 1 uppercase letter, 1 lowercase letter, 1 symbol and 1 number atleast.
                                                </Form.Text>
                                                : ''}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicHeight">
                                            <Form.Label>Height</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="number" placeholder="Enter Height (cm)" onChange={(event) => {
                                                setHeight(event.target.value)
                                                if (event.target.value <= 100) {
                                                    setHeightCheck(true)
                                                }
                                                else {
                                                    setHeightCheck(false)
                                                }
                                            }
                                            } />
                                            {heightCheck && (height.length !== 0) ?
                                                <Form.Text style={{ color: "red", fontSize: "10px" }}>
                                                    * invalid height
                                                </Form.Text>
                                                : ''}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicAge">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="number" placeholder="Enter Age" onChange={(event) => {
                                                setAge(event.target.value)
                                                if (event.target.value <= 15) {
                                                    setAgeCheck(true)
                                                }
                                                else {
                                                    setAgeCheck(false)
                                                }
                                            }
                                            } />
                                            {ageCheck && (age.length !== 0) ?
                                                <Form.Text style={{ color: "red", fontSize: "10px" }}>
                                                    * invalid age. must be above 15
                                                </Form.Text>
                                                : ''
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} lg={6} sm={12}>
                                        <Form.Group className="mb-3" controlId="formBasicWeight">
                                            <Form.Label>Weight</Form.Label>
                                            <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="number" placeholder="Enter Weight (kg)" onChange={(event) => {
                                                setWeight(event.target.value)
                                                if (event.target.value <= 30) {
                                                    setWeightCheck(true)
                                                }
                                                else {
                                                    setWeightCheck(false)
                                                }
                                            }
                                            } />
                                            {weightCheck && (weight.length !== 0) ?
                                                <Form.Text style={{ color: "red", fontSize: "10px" }}>
                                                    * invalid weight
                                                </Form.Text>
                                                : ''
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
                                        <Button variant="dark" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }}
                                            onClick={async () => {
                                                var config = {
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                }
                                                const result = await axios.post('/api/users/email/verify',
                                                    { email },
                                                    config)
                                                const { data } = result
                                                setVerifyEmail(data.check)
                                                if (!passwordCheck && !emailCheck && !heightCheck && !weightCheck && !ageCheck && !data.check) {
                                                    dispatch(signup(name, age, password, weight, email, height))
                                                    history('/api/login')
                                                }
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