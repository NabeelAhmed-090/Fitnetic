import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import answerPNG from '../../Image/adminAnswer.png'
import userPNG from '../../Image/adminUser.png'
import workoutPNG from '../../Image/adminWorkout.png'
import dietPNG from '../../Image/adminDiet.png'


const Admin = () => {
    return (
        <Container style={{ paddingTop: "5vh" }}>
            <Row>
                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={answerPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b>Dashboard</b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Answer Users queries
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100">View Questions</Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={userPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b>Users</b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Remove existing account
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100">View Users</Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>

                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={workoutPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b>Workout</b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Add/update/delete workout plans
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100">View Workout Plans</Button>
                        </Card.Body>
                    </Card>
                    <hr />
                </Col>
                <Col className="mt-2" md={3} sm={12} lg={3} style={{ display: "flex", justifyContent: "center" }}>
                    <Card style={{ width: '18rem', backgroundColor: "#F0F0F0" }}>
                        <Card.Img style={{ height: "40vh" }} variant="top" src={dietPNG} />
                        <Card.Body style={{ height: "20vh" }}>
                            <Card.Title style={{ textAlign: "center" }}><b>Diet</b></Card.Title>
                            <Card.Text style={{ textAlign: "center" }}>
                                Add/update/delete diet plans
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Button variant="dark" className="btn-block w-100">View Diet Plans</Button>
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
        </Container >
    )
}

export default Admin