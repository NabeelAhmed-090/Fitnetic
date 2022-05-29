import React, { useState } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/Loader'
import { useSelector, useDispatch } from 'react-redux'

const Goal = () => {
    const [loadingWorkout, setLoadingWorkout] = useState(false)
    const [loadingDiet, setLoadingDiet] = useState(false)
    const [tag, setTag] = useState(["WeightLoss", "WeightGain", "Core", "Cardio", "flexibility", "UpperBody", "LowerBody", "MuscleGain", "Endurance"])
    const [selectedTags, setSelectedTags] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [diet, setDiet] = useState([])
    const [selectedWorkout, setSelectedWorkout] = useState({})
    const [selectedDiet, setSelectedDiet] = useState({})

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const { _id } = userInfo

    return (
        <Container>
            <Row className="mb-2">
                <Col style={{ textAlign: "center" }} className='mb-3 mt-3' md={12} sm={12} lg={12}>
                    <h1>Current Goal</h1>
                </Col>
                <Col md={6} sm={6} lg={6}>
                    <Card>
                        <Card.Header style={{ textAlign: "center", color: "white", backgroundColor: "black" }}>Workout Plan</Card.Header>
                        <Card.Body style={{ textAlign: "center" }}>
                            <blockquote className="blockquote mb-0">
                                <h5>
                                    <b>{selectedWorkout.name}</b>
                                </h5>
                            </blockquote>
                            <hr />
                            {selectedWorkout.exercises && selectedWorkout.exercises.map((i) => {
                                return (
                                    <>
                                        <h6>{i.name} x {i.sets} x {i.reps}</h6>
                                    </>
                                )
                            })}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} sm={6} lg={6}>
                    <Card>
                        <Card.Header style={{ textAlign: "center", color: "white", backgroundColor: "black" }}>Diet Plan</Card.Header>
                        <Card.Body style={{ textAlign: "center" }}>
                            <blockquote className="blockquote mb-0">
                                <h5>
                                    <b>{selectedDiet.name}</b>
                                </h5>
                            </blockquote>
                            <hr />
                            {selectedDiet.food && selectedDiet.food.map((i) => {
                                return (
                                    <>
                                        <h6 className="mt-1">{i.name} {i.quantity} ({i.unit})</h6>
                                    </>
                                )
                            })}

                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} sm={12} lg={12}>
                    <Button variant="dark" className="btn-block mt-4" style={{ float: "right" }} onClick={async () => {

                        var config = {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }

                        const user_id = _id
                        const workout_id = selectedWorkout.id
                        const diet_id = selectedDiet.id

                        const result = await axios.post('/api/goal/save',
                            { data: { user: user_id, diet: diet_id, workout: workout_id } },
                            config)
                    }}>
                        Save Goal
                    </Button>
                </Col>
                <hr className='mt-2' />
            </Row>
            <Row>
                <Col style={{ minHeight: "60vh" }}>
                    <Row className="p-3" style={{ minHeight: "30vh" }}>
                        <Container>
                            <Row className="p-3">
                                {
                                    tag.map(i => {
                                        return (
                                            <Col className="mt-2" style={{ textAlign: "center" }} md={6} sm={12} lg={6}>
                                                <Row>
                                                    <Col style={{ backgroundColor: "#FEE715CF" }} md={10} sm={12} lg={10} className="shadow p-1 rounded" >
                                                        <pre>{i}</pre>
                                                    </Col>
                                                    <Col md={2} sm={12} lg={2} style={{ justifyContent: "right" }}>
                                                        <Button variant="dark btn-block w-100 mt-1" onClick={() => {
                                                            if (selectedTags.length < 3) {
                                                                setSelectedTags([...selectedTags, i])
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
                </Col>
                <hr />
            </Row>
            <Row>
                <Col md={12} sm={12} lg={12}>
                    {
                        selectedTags.map((i) => {
                            return (
                                <>
                                    <Row>
                                        <Col md={9} sm={9} lg={9}>
                                            <h5> {i} </h5>
                                        </Col>
                                        <Col md={3} sm={3} lg={3}>
                                            <Button variant="dark" className="btn-block w-100" onClick={() => {
                                                setTag([...tag, i])
                                                setSelectedTags(selectedTags.filter(itr => itr !== i))
                                            }}><b>-</b></Button>
                                        </Col>
                                    </Row>
                                    <hr />
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col md={6} sm={12} lg={6}>
                    <Button className="btn-block w-100 my-3 p-1" variant='dark' onClick={async () => {
                        setLoadingWorkout(true)
                        var config = {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                        const result = await axios.post('/api/goal/workouts',
                            { selectedTags },
                            config)
                        const { data } = result
                        let workoutList = []
                        workoutList = data.map((i) => {
                            if (i != null) {
                                return (
                                    {
                                        name: i.name,
                                        calories: i.calories,
                                        id: i.id,
                                        exercises: i.exercises
                                    }
                                )
                            }
                            else {
                                return null
                            }
                        })
                        workoutList = workoutList.filter(i => i !== null)
                        setWorkouts([...workoutList])
                        setLoadingWorkout(false)
                    }}>Suggest Workout</Button>
                </Col>
                <Col md={6} sm={12} lg={6}>
                    <Button className="btn-block w-100 my-3 p-1" variant='dark' onClick={async () => {
                        setLoadingDiet(true)
                        var config = {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                        const result = await axios.post('/api/goal/diet',
                            { selectedTags },
                            config)
                        const { data } = result
                        let dietList = []
                        dietList = data.map((i) => {
                            if (i != null) {
                                return (
                                    {
                                        food: i.food,
                                        name: i.name,
                                        calories: i.calories,
                                        id: i.id
                                    }
                                )
                            }
                            else {
                                return null
                            }
                        })
                        dietList = dietList.filter(i => i !== null)
                        setDiet([...dietList])
                        setLoadingDiet(false)
                    }}>Suggest Diet</Button>
                </Col>
            </Row>
            <Row>
                <Col md={6} sm={6} lg={6}>
                    <Row>
                        <Col style={{ textAlign: "center" }}>
                            <h1>Workouts</h1>
                        </Col>
                        <hr />
                    </Row>
                    <Row className="mt-3 mb-3">
                        {loadingWorkout === true ? <Loader /> : <>
                            {
                                workouts.map((i) => {
                                    return (
                                        <>
                                            <Row>
                                                <Col md={7} sm={7} lg={7}>
                                                    <h5> {i.name} </h5>
                                                </Col>
                                                <Col md={2} sm={2} lg={2}>
                                                    <h5> {i.calories} </h5>
                                                </Col>
                                                <Col md={3} sm={3} lg={3}>
                                                    <Button variant="dark" className="btn-block w-100 mb-3" onClick={() => {
                                                        setSelectedWorkout(i)
                                                    }}><b>+</b></Button>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    )
                                })
                            }
                        </>
                        }
                    </Row>
                </Col>
                <Col md={6} sm={6} lg={6}>
                    <Row>
                        <Col style={{ textAlign: "center" }}>
                            <h1>Diets</h1>
                        </Col>
                        <hr />
                    </Row>
                    <Row className="mt-3 mb-3">
                        {loadingDiet === true ? <Loader /> : <>
                            {
                                diet.map((i) => {
                                    return (
                                        <>
                                            <Row>
                                                <Col md={7} sm={7} lg={7}>
                                                    <h5> {i.name} </h5>
                                                </Col>
                                                <Col md={2} sm={2} lg={2}>
                                                    <h5> {i.calories} </h5>
                                                </Col>
                                                <Col md={3} sm={3} lg={3}>
                                                    <Button variant="dark" className="btn-block w-100 mb-3" onClick={() => {
                                                        setSelectedDiet(i)
                                                    }}><b>+</b></Button>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </>
                                    )
                                })
                            }
                        </>
                        }
                    </Row>
                </Col>
            </Row >

        </Container >
    )
}

export default Goal