import React, { useState } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import answerPNG from '../../Image/adminAnswer.png'
import userPNG from '../../Image/adminUser.png'
import workoutPNG from '../../Image/adminWorkout.png'
import dietPNG from '../../Image/adminDiet.png'

import Question from '../../components/Question'
import Workout from '../../components/Workout'
import Diet from '../../components/Diet'
import User from '../../components/User'

const Admin = () => {
    const [userState, setUserState] = useState(false)
    const [questionState, setQuestionState] = useState(true)
    const [workoutState, setWorkoutState] = useState(false)
    const [dietState, setDietState] = useState(false)
    return (
        <Container className="fonts" style={{ paddingTop: "5vh" }}>
            <Row>
                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={answerPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b><span className="fonts">Dashboard</span></b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Answer Users queries
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100" onClick={() => {
                                setUserState(false)
                                setWorkoutState(false)
                                setDietState(false)
                                setQuestionState(true)
                            }
                            }><span className="fonts">View Questions</span></Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={userPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b><span className="fonts">Users</span></b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Remove existing account
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100" onClick={() => {
                                setWorkoutState(false)
                                setDietState(false)
                                setQuestionState(false)
                                setUserState(true)
                            }
                            }><span className="fonts">View Users</span></Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>

                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={workoutPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b><span className="fonts">Workout</span></b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Add/delete workout plans
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100" onClick={() => {
                                setDietState(false)
                                setQuestionState(false)
                                setUserState(false)
                                setWorkoutState(true)
                            }
                            } ><span className="fonts">View Workout Plans</span></Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={dietPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b><span className="fonts">Diet</span></b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Add/delete diet plans
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100" onClick={() => {
                                setQuestionState(false)
                                setWorkoutState(false)
                                setUserState(false)
                                setDietState(true)
                            }
                            } ><span className="fonts">View Diet Plans</span></Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={12} sm={12}>
                    <hr style={{
                        width: "100%",
                        height: "5px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "black"
                    }} />
                </Col>
            </Row>
            <Row>
                <Col md={12} sm={12} lg={12}>
                    {questionState && <Question key={1} />}
                    {userState && <User key={2} />}
                    {workoutState && <Workout key={3} />}
                    {dietState && <Diet key={4} />}
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={12} sm={12}>
                    <hr style={{
                        width: "100%",
                        height: "5px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "black"
                    }} />
                </Col>
            </Row>
        </Container >
    )
}

export default Admin