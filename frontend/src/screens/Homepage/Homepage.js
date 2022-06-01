import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../../components/Loader'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Homepage.css';

const Homepage = () => {
    const dispatch = useDispatch()
    let history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    const [reload, setReload] = useState(false)
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [BMI, setBMI] = useState(0)
    const [goal, setGoal] = useState({})
    const [workout, setWorkout] = useState([])
    const [food, setFood] = useState([])
    const [workoutUpdate, setWorkoutUpdate] = useState([])
    const [dietUpdate, setDietUpdate] = useState([])
    const [workoutProgess, setWorkoutProgress] = useState(0)
    const [dietProgess, setDietProgress] = useState(0)
    const [trackingProgress, setTrackingProgress] = useState({})

    var danger = 'progress-bar bg-danger'
    var warning = 'progress-bar bg-warning'
    var success = 'progress-bar bg-success'


    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    useEffect(() => {
        if (!userInfo) {
            history("/api/login")
        }
        else {
            const { _id } = userInfo
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
            }

            async function getGoal() {
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


                config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                const _tp = await axios.post('/api/trackingProgress/user/data',
                    { _id },
                    config)
                setTrackingProgress(_tp.data)

                if (data && _tp.data) {
                    setWorkoutProgress(((_tp.data.totalCaloriesBurnt * 100 / data.WorkoutTotalCalories).toFixed(2)))
                    setDietProgress(((_tp.data.totalCaloriesIntake * 100 / data.DietTotalCalories).toFixed(2)))
                }

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
            for (let i = 0; i < workout.length; i++) {
                setWorkoutUpdate([...workoutUpdate, 0])
            }
            for (let i = 0; i < food.length; i++) {
                setDietUpdate([...dietUpdate, 0])
            }
            getUser()
            getGoal()
            getInfo()
        }

    }, [dispatch, history, userInfo, reload])

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
        setReload(!reload)
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
                                        <h6 className="boldFonts"><b>Name    :</b></h6>
                                    </Col>
                                    <Col md={6} sm={4} lg={6}>
                                        <h6 className="lightFonts">{user.name}</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6 className="boldFonts"><b>Age     : </b></h6>
                                    </Col>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6 className="lightFonts">{user.age}</h6>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "8vh" }}>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6 className="boldFonts"><b>Weight  : </b></h6>

                                    </Col>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6 className="lightFonts">{user.weight} (kg)</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} sm={12} lg={6}>
                                <Row>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6 className="boldFonts"><b>Height  : </b></h6>

                                    </Col>
                                    <Col md={6} sm={6} lg={6}>
                                        <h6 className="lightFonts">{user.height} (cm)</h6>
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
                                    <Card.Title style={{ textAlign: "center" }} className="boldFonts"><b>BMI VALUE</b></Card.Title>
                                    <Card.Text style={{ textAlign: "center" }} className="lightFonts">
                                        Current BMI State ({BMI.toFixed(2)})
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body className="lightFonts">
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
                                    <h3 className="boldFonts"><b>Days Left :{goal.days - trackingProgress.days}</b></h3>
                                </Col>
                                <hr />
                                <Col md={12} sm={12} lg={12}>
                                    <Row className="shadow p-3 mb-5 rounded">
                                        <Col style={{ textAlign: "center" }} md={12} sm={12} lg={12}>
                                            <h3 className="boldFonts"><b>Workout : {goal.workoutName}</b></h3>
                                        </Col>
                                        <Row className="boldFonts">
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
                                                                    placeholder="sets X reps Completed"
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
                                            <h3 className="boldFonts"><b>Diet : {goal.dietName}</b></h3>
                                        </Col>
                                        <Row className="boldFonts">
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
                                        <Button variant="dark" className="btn-block w-100" onClick={handleUpdate}><span className="lightFonts">Update Progress</span></Button>
                                    </Col>
                                </Row>
                                <Container>
                                    {trackingProgress.days !== 0 ? (
                                        <>
                                            <Row className="shadow p-3 mb-4 rounded">
                                                <Row>
                                                    <Col style={{ textAlign: "center" }} md={12} sm={12} lg={12}>
                                                        <h3 className="boldFonts"><b>Progress Made In {trackingProgress.days} days</b></h3>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <ul>
                                                        <li style={{ color: "rgb(0, 128, 128)" }}><h5 className="boldFonts"><b>Workout</b></h5></li>
                                                        <li style={{ color: "rgb(128, 0, 0)" }}><h5 className="boldFonts"><b>Diet</b></h5></li>
                                                    </ul>
                                                </Row>
                                                <Row className="mt-5 mb-5">
                                                    <Col className="workout" md={6} sm={12} lg={6}>
                                                        <div style={{ width: "35vh", height: "35vh" }}>
                                                            <CircularProgressbar value={workoutProgess} text={`${workoutProgess} %`}
                                                                styles={{
                                                                    // Customize the root svg element
                                                                    root: {},
                                                                    // Customize the path, i.e. the "completed progress"
                                                                    path: {
                                                                        // Path color
                                                                        stroke: `rgb(0, 128, 128)`,
                                                                        strokeLinecap: 'round',
                                                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                                                        transformOrigin: 'center center',
                                                                    },
                                                                    trail: {
                                                                        stroke: 'white',
                                                                        strokeLinecap: 'round',
                                                                        transformOrigin: 'center center',
                                                                    },
                                                                    // Customize the text
                                                                    text: {
                                                                        fill: 'black',
                                                                        fontSize: '16px',
                                                                    },
                                                                }} />
                                                        </div>
                                                    </Col>
                                                    <Col className="diet" md={6} sm={12} lg={6}>
                                                        <div style={{ width: "35vh", height: "35vh" }}>
                                                            <CircularProgressbar value={dietProgess} text={`${dietProgess} %`}
                                                                styles={{
                                                                    // Customize the root svg element
                                                                    root: {},
                                                                    // Customize the path, i.e. the "completed progress"
                                                                    path: {
                                                                        // Path color
                                                                        stroke: `rgb(128, 0, 0)`,
                                                                        strokeLinecap: 'round',
                                                                        transition: 'stroke-dashoffset 0.5s ease 0s',
                                                                        transformOrigin: 'center center',
                                                                    },
                                                                    trail: {
                                                                        stroke: 'white',
                                                                        strokeLinecap: 'round',
                                                                        transformOrigin: 'center center',
                                                                    },
                                                                    // Customize the text
                                                                    text: {
                                                                        fill: 'black',
                                                                        fontSize: '16px',
                                                                    },
                                                                }} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Row>
                                        </>
                                    ) : ''}
                                </Container>
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



