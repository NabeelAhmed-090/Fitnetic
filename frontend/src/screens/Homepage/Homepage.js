import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/Loader'

const Homepage = () => {
    const dispatch = useDispatch()
    let history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [BMI, setBMI] = useState(0)
    const [goal, setGoal] = useState({})
    const [workout, setWorkout] = useState([])
    const [food, setFood] = useState([])
    const [workoutUpdate, setWorkoutUpdate] = useState([])
    const [dietUpdate, setDietUpdate] = useState([])


    var danger = 'progress-bar bg-danger'
    var warning = 'progress-bar bg-warning'
    var success = 'progress-bar bg-success'


    function isEmpty(obj) {
        console.log(Object.keys(obj).length)
        return Object.keys(obj).length === 0;
    }

    useEffect(() => {
        if (!userInfo) {
            history("/api/login")
        }
        else {
            const { _id } = userInfo
            async function getGoal() {
                setLoading(true)
                var config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                const result = await axios.post('/api/goal/data',
                    { _id },
                    config)
                const { data } = result
                setGoal(data)
            }
            async function getInfo() {
                var config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

                const workouts = await axios.post('/api/goal/get/workout',
                    { _id },
                    config)
                const { data } = workouts
                setWorkout(data)

                const food = await axios.post('/api/goal/get/food',
                    { _id },
                    config)
                setFood(food.data)
                setLoading(false)
            }
            getGoal()
            getInfo()
            // setWorkout([{
            //     name: "Jogging",
            //     reps: 1,
            //     sets: 30,
            //     id: "6293802851a618f005d1735f"
            // },
            // {
            //     name: "Pushups",
            //     reps: 3,
            //     sets: 15,
            //     id: "6293802851a618f005d1735f"
            // },
            // {
            //     name: "Dumbbell",
            //     reps: 3,
            //     sets: 15,
            //     id: "6293802851a618f005d1735f"
            // }])
            // setFood([{
            //     name: "Pudding",
            //     unit: "grams",
            //     quantity: "55",
            //     id: "6293802851a618f005d17354"
            // },
            // {
            //     name: "Yoghurt",
            //     unit: "grams",
            //     quantity: "5",
            //     id: "6293802851a618f005d17354"
            // },
            // {
            //     name: "Banana",
            //     unit: "grams",
            //     quantity: "5",
            //     id: "6293802851a618f005d17354"
            // }])
            for (let i = 0; i < workout.length; i++) {
                setWorkoutUpdate([...workoutUpdate, 0])
            }
            for (let i = 0; i < food.length; i++) {

                setDietUpdate([...dietUpdate, 0])
            }
            setGoal({
                days: 30,
                workoutName: "exercise 1",
                dietName: "diet 1",
            })
        }

        async function getUser() {
            setLoading(true)
            const { _id } = userInfo
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const result = await axios.post('/api/users/profile',
                { _id },
                config)
            const { data } = result
            var height = (data.height / 100)
            setBMI(data.weight / (height * height))
            setUser(data)
            setLoading(false)
        }
        getUser()

    }, [dispatch, history, userInfo])

    const handleUpdate = async () => {
        let w_list = workoutUpdate.filter(i => i !== null && i !== 0)
        let d_list = dietUpdate.filter(i => i !== null && i !== 0)
        var config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { _id } = userInfo
        await axios.post('/api/users/profile/dailyUpdate',
            { d_list, w_list, _id },
            config)
    }
    return (
        <>
            {loading ? <Loader /> : (
                <Container>
                    <>
                        <Row style={{ marginTop: "5vh" }}>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={4} lg={6}>
                                        <h6><b>Name    :</b></h6>
                                    </Col>
                                    <Col md={6} sm={4} lg={6}>
                                        <h6>{user.name}</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6><b>Age     :</b></h6>
                                    </Col>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6>{user.age}</h6>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "8vh" }}>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6><b>Weight  :</b></h6>

                                    </Col>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6>{user.weight} (kg)</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6><b>Height  :</b></h6>

                                    </Col>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6>{user.height} (cm)</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <hr />
                        </Row>
                    </>

                    <Row className="mt-5">
                        <Col md={12} sm={12} lg={12}>
                            <Card style={{ width: '100%', backgroundColor: "#F0F0F0" }}>
                                <Card.Body style={{ height: "15vh" }}>
                                    <Card.Title style={{ textAlign: "center" }}><b>BMI VALUE</b></Card.Title>
                                    <Card.Text style={{ textAlign: "center" }}>
                                        Current BMI State ({BMI.toFixed(2)})
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <div className="progress">
                                        <div className={((BMI < 18.5) || (BMI >= 25 && BMI < 30)) ? warning :
                                            (BMI >= 30 ? danger : success)} style={BMI < 18.5 ? underWeight :
                                                BMI >= 25 && BMI < 30 ? overWeight : BMI >= 30 ? obese : normal}></div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {!isEmpty(goal) ? (
                        <>
                            <Row className="mt-5">
                                <hr />
                                <Col className="mb-2" style={{ textAlign: "center" }} md={12} sm={12} lg={12}>
                                    <h3><b>Days Left :{goal.days}</b></h3>
                                </Col>
                                <hr />
                                <Col md={12} sm={12} lg={12}>
                                    <Row className="shadow p-3 mb-5 rounded">
                                        <Col style={{ textAlign: "center" }} md={12} sm={12} lg={12}>
                                            <h3><b>Workout : {goal.workoutName}</b></h3>
                                        </Col>
                                        <Row>
                                            {
                                                workout.map((i) => {
                                                    return (
                                                        <Row className="mt-3 mb-3">
                                                            <Col md={4} sm={4} lg={4}>
                                                                <b>{i.name}</b>
                                                            </Col>
                                                            <Col style={{ textAlign: "center" }} md={4} sm={4} lg={4}>
                                                                <b>{i.sets} x {i.reps}</b>
                                                            </Col>
                                                            <Col md={4} sm={4} lg={4}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Reps Completed"
                                                                    id={i.name}
                                                                    aria-describedby="descriptionlock"
                                                                    onChange={(event) => {
                                                                        const obj = {
                                                                            exerciseName: i.id,
                                                                            setsXreps: event.target.value
                                                                        }
                                                                        const newWorkout = workoutUpdate.filter(itr => itr.exerciseName !== i.id)
                                                                        setWorkoutUpdate([...newWorkout, obj])
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Row>
                                    <Row className="shadow p-3 mb-4 rounded">
                                        <Col style={{ textAlign: "center" }} md={12} sm={12} lg={12}>
                                            <h3><b>Diet : {goal.dietName}</b></h3>
                                        </Col>
                                        <Row>
                                            {
                                                food.map((i) => {
                                                    return (
                                                        <Row className="mt-3 mb-3">
                                                            <Col md={4} sm={4} lg={4}>
                                                                <b>{i.name}</b>
                                                            </Col>
                                                            <Col style={{ textAlign: "center" }} md={4} sm={4} lg={4}>
                                                                <b>{i.quantity} {i.unit}</b>
                                                            </Col>
                                                            <Col md={4} sm={4} lg={4}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Food Intake"
                                                                    id={i.name}
                                                                    aria-describedby="descriptionlock"
                                                                    onChange={(event) => {
                                                                        const obj = {
                                                                            foodName: i.id,
                                                                            quantity: event.target.value
                                                                        }
                                                                        const newDiets = dietUpdate.filter(itr => itr.foodName !== i.id)
                                                                        setDietUpdate([...newDiets, obj])
                                                                    }}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Row>
                                </Col>
                                <Row className="mb-3">
                                    <Col md={4} sm={4} lg={4}></Col>
                                    <Col md={4} sm={4} lg={4}>
                                        <Button variant="dark" className="btn-block w-100" onClick={handleUpdate}>Update Progress</Button>
                                    </Col>
                                </Row>
                                <Row className="shadow p-3 mb-4 rounded">
                                    <Col style={{ textAlign: "center" }} md={12} sm={12} lg={12}>
                                        <h3><b>Progress</b></h3>
                                    </Col>
                                </Row>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row className="mt-5">
                                <Col md={12} sm={12} lg={12}>
                                    <Card style={{ width: '100%', backgroundColor: "#F0F0F0" }}>
                                        <Card.Body style={{ height: "15vh" }}>
                                            <Card.Title style={{ textAlign: "center" }}><b>Goal Status</b></Card.Title>
                                            <Card.Text style={{ textAlign: "center" }}>
                                                No Current Goal Exists
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            )
            }
        </>
    )
}


const normal = {
    width: "50%"
}

const underWeight = {
    width: "25%"
}

const overWeight = {
    width: "75%"
}

const obese = {
    width: "100%"
}

export default Homepage



