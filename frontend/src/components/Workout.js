import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap'
import { route } from 'express/lib/router'
import workoutPNG from '../Image/gym.png'


const Workout = () => {
    const [tags, setTags] = useState([])
    const [value, setValue] = useState("")
    const [exercisesList, setExerciesList] = useState([])
    const [workout, setWorkout] = useState([])

    useEffect(() => {
        async function getExercises() {
            const result = await axios.get("/api/workout/exercises")
            const { data } = result
            setExerciesList(data)
        }
        getExercises()
    }, [])


    return (
        <Container style={{ backgroundColor: "#F0F0F0", marginTop: "3vh", minHeight: "60vh" }}>
            <Row style={{ padding: "3vh", minHeight: "80vh" }}>
                <Col md={10} sm={10} lg={10}>
                    <h2><b>Include</b></h2>
                </Col>
                <Col md={2} sm={2} lg={2}>
                    <div style={{ height: "15vh" }}>
                        <img
                            className="d-block"
                            src={workoutPNG}
                            alt="First slide"
                            style={{ height: "100%", width: "60%" }}
                        />
                    </div>
                </Col>
                <Col md={4} sm={4} lg={4}>
                    <Row>
                        <Col md={12} sm={12} lg={12}>
                            <Form.Control
                                style={{ width: "100%" }}
                                type="text"
                                placeholder='Enter tags'
                                value={value}
                                id="postAQuestion"
                                aria-describedby="postAQuestionBlock"
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "5vh" }} md={12} sm={12} lg={12}>
                            <div style={{ textAlign: "center", height: "30vh", justifyContent: "center", overflow: "scroll" }} className="shadow p-1 bg-white rounded">
                                <Row>
                                    <Col md={12} sm={12} lg={12}>
                                        <h4>#Tags</h4>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    {
                                        tags.map(i => {
                                            return (
                                                <>
                                                    <Col md={3} sm={3} lg={3}>
                                                        <h5> #{i} </h5>
                                                        <hr />
                                                    </Col>

                                                </>
                                            )
                                        })
                                    }

                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12} sm={12} lg={12}>
                            <Button variant="dark" className="btn-block w-100 mt-3" onClick={() => {
                                if (value !== "") {
                                    setTags([...tags, value])
                                    setValue("")
                                }
                            }}>Add</Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={4} lg={4} sm={4}>
                    <Dropdown style={{ position: "static !important", width: "100% !important" }} className="btn-block w-100">
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-3">
                                <Row>
                                    <Col md={6} lg={6} sm={6}>
                                        <b>Name</b>
                                    </Col>
                                    <Col md={6} lg={6} sm={6}>
                                        <b>Benefit</b>
                                    </Col>
                                </Row>
                            </Dropdown.Item>
                            {
                                exercisesList.map(i => {
                                    return (
                                        <Dropdown.Item href="#/action-3" onClick={() => {

                                            setWorkout([...workout, i])

                                        }}>
                                            <Row>
                                                <Col md={6} lg={6} sm={6}>
                                                    {i.name}
                                                </Col>
                                                <Col md={6} lg={6} sm={6}>
                                                    {i.benefit}
                                                </Col>
                                            </Row>
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={4} lg={4} sm={4}>
                    <div style={{ textAlign: "center", height: "41vh", justifyContent: "center", overflow: "scroll" }} className="shadow p-1 bg-white rounded">
                        <Row>
                            <Col md={12} sm={12} lg={12}>
                                <h4>Exercises</h4>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            {
                                workout.map(i => {
                                    return (
                                        <>
                                            <Col md={3} sm={3} lg={3}>
                                                <h5> {i.name} </h5>
                                                <hr />
                                            </Col>

                                        </>
                                    )
                                })
                            }

                        </Row>
                    </div>
                    <Row className="mb-3">
                        <Col md={12} sm={12} lg={12}>
                            <Button variant="dark" className="btn-block w-100 mt-3" onClick={async () => {
                                var totalCaloriesCount = 0
                                workout.map(i => {
                                    totalCaloriesCount += Number(i.calories)
                                })
                                var config = {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                }
                                await axios.post('/api/workout/add',
                                    { workout, totalCaloriesCount, tags },
                                    config)
                            }}>Save</Button>
                        </Col>
                    </Row>
                </Col>

                <hr />
            </Row >
        </Container >
    )
}

export default Workout