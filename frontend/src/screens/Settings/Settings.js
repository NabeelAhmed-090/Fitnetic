import React, { useState } from 'react'
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
    const { email } = userInfo || ""
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [password, setPassword] = useState("")
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [image, setImage] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteAccount = () => {
        dispatch(deleteUser(email))
        history("/api/users/login")
    }

    return (
        <>
            <Container style={{ paddingTop: "9vh" }}>
                <Row>
                    <Col md={12} sm={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Container style={{ width: "50vw" }} className="shadow p-3 mb-5 bg-white rounded">
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
                                        <Button variant="dark" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }} onClick={() => {
                                            dispatch(update(name, age, weight, password, height, image, email))
                                        }}>
                                            Update Profile
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={12} lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Container style={{ width: "50vw" }} className="shadow p-3 mb-5 bg-white rounded">
                            <Row>
                                <Col md={12} lg={12} sm={12}>
                                    <h5><b>Do you want to delete your account permanently? </b></h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
                                    <Button variant="danger" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }} onClick={handleShow}>
                                        Delete Account
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
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Settings