import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap'
import { route } from 'express/lib/router'
import workoutPNG from '../Image/gym.png'


const Workout = () => {
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState(["ABCDEF", "BCD", "CEF", "DEF", "EFG", "FGH", "GHI", "HIJ", "IJK", "JKL", "KLM", "LMN", "MNO"])
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
            <Row style={{ padding: "3vh", minHeight: "20vh" }}>
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
            </Row>
            <Row style={{ padding: "3vh", minHeight: "80vh" }}>
                <Col md={4} sm={4} lg={4}>
                    <Row className="p-3" style={{ minHeight: "30vh" }}>
                        <Container>
                            <Row>
                                {
                                    tag.map(i => {
                                        return (
                                            <Col className="mt-1" style={{ borderRadius: "25", textAlign: "center", justifyContent: "center" }} md={4} sm={2} lg={4}>
                                                <Row>
                                                    <Col style={{ backgroundColor: "#FEE715CF" }} md={7} sm={4} lg={7} className="shadow p-1 rounded" >
                                                        <pre>{i}</pre>
                                                    </Col>
                                                    <Col md={5} sm={8} lg={5}>
                                                        <Button variant="dark" className="btn-block w-100" onClick={() => {
                                                            if (tags.length < 5) {
                                                                setTags([...tags, i])
                                                                setTag(tag.filter(itr => itr !== i))
                                                            }
                                                        }}><b>+</b></Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                    </Row>
                    <Row>
                        <Col style={{
                            marginTop: "5vh",
                            height: "40vh",
                            width: "100%"
                        }} md={12} sm={12} lg={12}>
                            <div style={{
                                textAlign: "center",
                                height: "40vh",
                                justifyContent: "center",
                                overflow: "auto",
                                width: "100%",
                                overflowX: "hidden",
                            }} >
                                <Row>
                                    <Col md={12} sm={12} lg={12}>
                                        <h4>#Tags</h4>
                                        <hr />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    {
                                        tags.map(i => {
                                            return (
                                                <>
                                                    <Col md={6} sm={6} lg={6} className="p-1">
                                                        <Row>
                                                            <Col md={8} sm={8} lg={8}>
                                                                <h5> #{i} </h5>
                                                            </Col>
                                                            <Col md={3} sm={3} lg={3}>
                                                                <Button variant="dark" className="btn-block w-100" onClick={() => {
                                                                    setTag([...tag, i])
                                                                    setTags(tags.filter(itr => itr !== i))
                                                                }}><b>-</b></Button>
                                                            </Col>
                                                        </Row>
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
                </Col>
                <Col md={4} lg={4} sm={4}>
                    <Dropdown>
                        <Dropdown.Toggle style={{ position: "static !important", width: "100% !important" }} className="btn-block w-100 mt-3 p-1" variant="dark" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ position: "static !important", width: "100% !important", textAlign: "center" }} className="btn-block w-100 mt-3 p-1">
                            <Dropdown.Item href="#">
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
                                        <Dropdown.Item href="#" onClick={() => {
                                            setExerciesList(exercisesList.filter(itr => itr.name != i.name))
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
                    <div style={{
                        textAlign: "center",
                        height: "41vh",
                        justifyContent: "center",
                        overflow: "scroll",
                        overflow: "auto",
                        overflowX: "hidden"

                    }} className="mt-3 p-1">
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
                                            <Col md={6} sm={6} lg={6}>
                                                <Row>
                                                    <Col md={8} sm={8} lg={8}>
                                                        <h5> {i.name} </h5>
                                                    </Col>
                                                    <Col md={4} sm={4} lg={4}>
                                                        <Button variant="dark" className="btn-block w-100" onClick={() => {
                                                            if (tags.length < 5) {
                                                                setExerciesList([...exercisesList, i])
                                                                setWorkout(workout.filter(itr => itr.name !== i.name))
                                                            }
                                                        }}><b>-</b></Button>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </Col>

                                        </>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Col >
                <hr />
            </Row >
            <Row>
                <Row className="mb-3">
                    <Col md={6} sm={6} lg={6}>
                        <Col md={12} sm={12} lg={12}>
                            <Button variant="dark" className="btn-block w-100 mt-3" onClick={() => {
                                if (value !== "") {
                                    setTags([])
                                    setTags([...tags, value])
                                    setValue("")
                                }
                            }}>Add Tags</Button>
                        </Col>
                    </Col>
                    <Col md={6} sm={6} lg={6}>
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
                        }}>Save Workout</Button>
                    </Col>
                </Row>
            </Row>
        </Container >
    )
}

export default Workout