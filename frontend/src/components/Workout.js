import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Dropdown, Form } from 'react-bootstrap'
import plusPNG from '../Image/plus.png'
import deletePNG from '../Image/delete.png'
import './Workout.css'
import Loader from './Loader'

const Workout = () => {
    const [loading, setLoading] = useState(false)
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState(["ABCDEF", "BCD", "CEF", "DEF", "EFG", "FGH", "GHI", "HIJ", "IJK", "JKL", "KLM", "LMN", "MNO"])
    const [name, setName] = useState("")
    const [exercisesList, setExerciesList] = useState([])
    const [workout, setWorkout] = useState([])
    const [check, setCheck] = useState(true)
    const [workoutList, setWorkoutList] = useState([""])

    useEffect(() => {
        async function getExercises() {
            setLoading(true)
            const result = await axios.get("/api/workout/exercises")
            const { data } = result
            setExerciesList(data)
        }
        async function getWorkouts() {
            const result = await axios.get("/api/workout/data")
            const { data } = result
            setWorkoutList(data)
            console.log(data)
            setLoading(false)
        }
        getExercises()
        getWorkouts()

    }, [])
    return (
        <>
            {loading === true ? <Loader /> :
                <Container>
                    <Row style={{ backgroundColor: "#F0F0F0", marginTop: "3vh", minHeight: "60vh" }}>
                        <Row style={{ padding: "3vh", maxHeight: "25vh" }}>
                            <Col md={10} sm={12} lg={10} className="mt-3">
                                <h2 className='cols'><b>Include</b></h2>
                            </Col>
                            <Col md={2} sm={12} lg={2}>
                                <div style={{ height: "15vh", display: "flex", justifyContent: "center" }}>
                                    <img
                                        className="d-block"
                                        src={plusPNG}
                                        alt="First slide"
                                        style={{ height: "100%", width: "60%" }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ minHeight: "10vh", maxHeight: "20%", minWidth: "35vw" }} className="mt-4">
                            <Col sm={6} md={4} lg={4} >
                                <Form.Control
                                    className="cols"
                                    onChange={(event) => {
                                        setName(event.target.value)
                                        workoutList.map(i => {
                                            if (i.name === event.target.value) {
                                                setCheck(false)
                                            }
                                            if (i.name !== event.target.value)
                                                setCheck(true)
                                            return 0
                                        })
                                    }}
                                    type="text"
                                    placeholder="Enter a unique name for this workout"
                                    id="description"
                                    aria-describedby="descriptionlock"
                                    value={name}
                                />
                                <Form.Text id="description" muted>
                                    {!check && <pre className="cols" style={{ color: "red", marginTop: "3vh" }}>Name already exists</pre>}
                                    {check && name.length !== 0 && <pre className="cols" style={{ color: "green", marginTop: "3vh" }}>Valid Name</pre>}
                                </Form.Text>
                            </Col>
                        </Row>
                        <Row style={{ padding: "3vh", minHeight: "80vh" }}>
                            <Col md={4} sm={12} lg={4} className="cols">
                                <Row className="p-3" style={{ minHeight: "30vh" }}>
                                    <Container>
                                        <Row>
                                            {
                                                tag.map(i => {
                                                    return (
                                                        <Col className="mt-2" style={{ textAlign: "center" }} md={6} sm={6} lg={6}>
                                                            <Row>
                                                                <Col style={{ backgroundColor: "#FEE715CF" }} md={7} sm={4} lg={7} className="shadow p-1 rounded" >
                                                                    <pre>{i}</pre>
                                                                </Col>
                                                                <Col md={3} sm={4} lg={3} style={{ justifyContent: "right" }}>
                                                                    <Button variant="dark" onClick={() => {
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
                            <Col md={3} lg={3} sm={12}>
                                <Dropdown>
                                    <Dropdown.Toggle style={{ position: "static !important", width: "100% !important" }} className="btn-block w-100 mt-3" variant="dark" id="dropdown-basic">
                                        View Exercises
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
                                                        setExerciesList(exercisesList.filter(itr => itr.name !== i.name))
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
                            <Col md={4} lg={4} sm={12}>
                                <div style={{
                                    textAlign: "center",
                                    height: "80vh",
                                    justifyContent: "center",
                                    overflow: "auto",
                                    overflowX: "hidden",
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
                                                                        setExerciesList([...exercisesList, i])
                                                                        setWorkout(workout.filter(itr => itr.name !== i.name))
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
                            <Col md={11} sm={11} lg={11}>
                                <hr className='buttons' />
                            </Col>
                        </Row >
                        <Row>
                            <Row className="mb-3">
                                <Col md={5} sm={12} lg={5} className="buttons">
                                    <Col md={12} sm={12} lg={12}>
                                        <Button variant="dark" className="btn-block w-100 mt-3" onClick={() => {
                                            setTag([...tags, ...tag])
                                            setTags([])
                                            setExerciesList([...exercisesList, ...workout])
                                            setWorkout([])
                                            setName("")
                                        }}>Reset</Button>
                                    </Col>
                                </Col>
                                <Col md={5} sm={12} lg={5} className="buttons">
                                    <Button variant="dark" className="btn-block w-100 mt-3" onClick={async () => {
                                        if (check) {
                                            setLoading(true)
                                            var totalCaloriesCount = 0
                                            workout.map(i => {
                                                totalCaloriesCount += Number(i.calories)
                                                return 0
                                            })
                                            var config = {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            }
                                            await axios.post('/api/workout/add',
                                                { workout, totalCaloriesCount, tags, name },
                                                config)
                                            setTag([...tags, ...tag])
                                            setTags([])
                                            setExerciesList([...exercisesList, ...workout])
                                            setWorkout([])
                                            setWorkoutList([...workoutList, name])
                                            setName("")
                                            setLoading(false)
                                        }
                                    }}>Save Workout</Button>
                                </Col>
                            </Row>
                        </Row>
                    </Row>
                    <Row style={{ backgroundColor: "#F0F0F0", marginTop: "3vh", minHeight: "60vh" }}>
                        <Row style={{ padding: "3vh", minHeight: "15vh" }}>
                            <Col md={10} sm={12} lg={10} className="mt-3">
                                <h2 className='cols'><b>Delete</b></h2>
                            </Col>
                            <Col md={2} sm={12} lg={2}>
                                <div style={{ maxHeight: "15vh", display: "flex", justifyContent: "center" }}>
                                    <img
                                        className="d-block"
                                        src={deletePNG}
                                        alt="First slide"
                                        style={{ height: "100%", width: "60%" }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "10vh" }}>
                            <Col md={12} sm={12} lg={12}>
                                {
                                    workoutList.map(i => {
                                        return (
                                            <>
                                                <Row>
                                                    <Col className="cols" md={10} sm={12} lg={10}>
                                                        <h4><b>{i.name}</b></h4>
                                                    </Col>
                                                    <Col md={1} sm={12} lg={1} className="delete">
                                                        <Button variant="dark" className="btn-block w-100 ml-4"><i className="fa-solid fa-trash"></i></Button>
                                                    </Col>
                                                    <Col className="cols"><hr /></Col>

                                                </Row>
                                            </>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Row>
                </Container>
            }
        </>
    )
}

export default Workout