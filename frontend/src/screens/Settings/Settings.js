import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update, deleteUser } from '../../actions/userActions'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Settings.css'

const Settings = () => {
    const dispatch = useDispatch()
    let history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const email = userInfo.email
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [password, setPassword] = useState("")
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [show, setShow] = useState(false);

    const [passwordCheck, setPasswordCheck] = useState(false)
    const [heightCheck, setHeightCheck] = useState(false)
    const [weightCheck, setWeightCheck] = useState(false)
    const [ageCheck, setAgeCheck] = useState(false)




    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})");

    const passwordFunc = (event) => {
        setPassword(event.target.value)

        if (passwordRegex.test(event.target.value)) {
            setPasswordCheck(false);
        }
        else {
            setPasswordCheck(true)
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!userInfo) {
            history("/api/login")
        }
    }, [dispatch, history, userInfo])

    const deleteAccount = () => {
        dispatch(deleteUser(email))
        history("/api/login")
    }

    return (
        <>
            <Container style={{ paddingTop: "9vh" }} className="lightFonts">
                <Row>
                    <Col md={12} sm={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Container style={{ width: "50vw", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-5 rounded">
                            <Form>
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
                                        <Button variant="dark" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }} onClick={() => {
                                            dispatch(update(name, age, weight, password, height, email))
                                        }}>
                                            <span className="lightFonts">Update Profile</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Container style={{ width: "50vw", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-5 rounded">
                            <Row>
                                <Col md={12} lg={12} sm={12}>
                                    <h5><b>Do you want to delete your account permanently? </b></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
                                    <Button variant="danger" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }} onClick={handleShow}>
                                        <span className="lightFonts">Delete Account</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This will permanently delete your data. </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteAccount}>
                        <span className="lightFonts">Delete Account</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Settings