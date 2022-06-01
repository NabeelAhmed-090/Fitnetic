import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../actions/userActions'
import { adminLoginFunc } from '../../actions/adminActions'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import loginPNG from '../../Image/login.png'
import Loader from '../../components/Loader'
import './Login.css'

const Login = () => {
    let history = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const adminLogin = useSelector((state) => state.adminLogin)
    const { loading, error, userInfo } = userLogin
    const { adminInfo } = adminLogin
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (adminInfo) {
            history("/api/admin")
        }
        if (userInfo) {
            history("/")
        }
    }, [dispatch, history, userInfo, adminInfo])

    const passwordFunc = (event) => {
        setPassword(event.target.value)
    }

    const emailFunc = (event) => {
        setEmail(event.target.value)
    }

    return (
        <>
            <Row style={{ paddingBottom: "0" }}>
                <Col md={6} sm={12} lg={6} style={{ marginBottom: "0" }}>
                    <div style={{ height: "100vh" }}>
                        <img
                            className="d-block w-100"
                            src={loginPNG}
                            alt="First slide"
                            style={{ height: "100%", width: "100%" }}
                        />
                    </div>
                </Col>
                {loading ? <Loader /> :
                    <>
                        <Col md={6} sm={12} lg={6} style={{ display: 'flex', justifyContent: 'center', paddingTop: "20vh", minHeight: "45vh" }}>
                            <Container style={{ minWidth: "35vw", maxWidth: "80%", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-5 rounded">
                                <Form >
                                    <Row>
                                        <Col style={{ textAlign: "center", justifyContent: 'center' }}>
                                            <h2 className="boldFonts">Login</h2>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: "10vh" }}>
                                        <Col md={12} lg={12} sm={12}>
                                            <Form.Group className="mb-3 lightFonts" controlId="formBasicEmail">
                                                <Form.Label >Email</Form.Label>
                                                <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000", outline: "none" }} type="email" placeholder="Enter Email" onChange={(event) => emailFunc(event)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} lg={12} sm={12}>
                                            <Form.Group className="mb-3 lightFonts" controlId="formBasicPassword">
                                                <Form.Label >Password</Form.Label>
                                                <Form.Control className="shadow-none" style={{ border: "0.5px solid #000000" }} type="password" placeholder="Password" onChange={(event) => passwordFunc(event)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
                                            <Button style={{ marginLeft: "auto", marginTop: "5vh" }} type="button" className="btn-block w-100 p-2 my-2" variant="dark" onClick={() => {
                                                if ((email === "nabeel@gmail.com" || email === "ayesha@gmail.com" || email === "laiba@gmail.com" || email === "hadiya@gmail.com") && password === '11223344') {
                                                    dispatch(adminLoginFunc(email, password))
                                                }
                                                else {
                                                    dispatch(login(email, password))
                                                }
                                            }}>
                                                <span className="lightFonts">Login</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row >
                                        {error ?
                                            <Col md={12} sm={12} lg={12} style={{ textAlign: "center" }}>
                                                <Form.Text className="lightFonts" style={{ color: "red" }}>
                                                    * Invalid Email or Password
                                                </Form.Text>
                                            </Col>
                                            : ''}
                                        <Col md={12} sm={12} lg={12} style={{ textAlign: "center" }}>
                                            <Form.Text className="text-muted lightFonts">
                                                If you don't have an account. Click <a href="/api/users/signup">here</a> to sign up.
                                            </Form.Text>
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                        </Col>
                    </>
                }
            </Row>
        </>
    )
}

export default Login