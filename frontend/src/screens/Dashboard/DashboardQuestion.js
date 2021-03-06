import axios from "axios";
import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/QuestionCard";
import { Container, Row, Col, Form, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import dashboardPNG from '../../Image/Dashboard.png'
import './DashboardQuestions.css';
import Loader from "../../components/Loader";


const DashboardQuestion = () => {
    const [questionsList, setQuestionsList] = useState([])
    const [questions, setQuestions] = useState("")
    const [filteredQuestionsList, setFilteredQuestionsList] = useState([])
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    var user = ""
    if (userInfo) {
        const { email } = userInfo
        user = email
    }
    useEffect(() => {
        async function getQuestions() {
            setLoading(true)
            const result = await axios.get("/api/dashboard")
            const { data } = result
            setQuestionsList(data)
            if (filteredQuestionsList.length === 0) {
                setFilteredQuestionsList(data)
            }
            setLoading(false)
        }
        getQuestions()
    }, [])

    const textBoxFunc = (event) => {
        if (event.target.value.length <= 400) {
            setQuestions(event.target.value)
        }
    }

    const postQuestionFunc = async () => {
        if (questions.length !== 0) {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            await axios.post('/api/dashboard/post',
                { questions, user },
                config)

            setQuestions("")
            window.location.reload(false);
        }

    }

    const filterFunc = () => {
        setFilteredQuestionsList([])
        setFilteredQuestionsList(
            questionsList.filter(i => i.questions.search(keyword) !== -1)
        )
    }



    return (
        <>
            <Container style={{ marginTop: "5vh", minHeight: "80vh" }} >
                {loading === true ? <Loader /> : <>
                    {
                        userLogin.userInfo &&
                        <Container style={{ marginTop: "5vh", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-5 rounded">
                            <Row style={{ minHeight: "10vh", maxHeight: "20%", textDecoration: "none", minWidth: "35vw" }}>
                                <Col sm={12} md={10} lg={10} >
                                    <h5 className="question boldFonts">
                                        POST A QUESTION
                                    </h5>
                                </Col>
                                <Col sm={12} md={2} lg={2} >
                                    <Button variant="dark" className="btn-block w-100 my-1 mb-1" onClick={postQuestionFunc}>
                                        <span className="lightFonts">POST</span>
                                    </Button>
                                </Col>
                            </Row>

                            <Row style={{ minHeight: "10vh", maxHeight: "20%", textDecoration: "none", minWidth: "35vw" }} className="lightFonts">
                                <Col sm={12} md={12} lg={12} className="lightFonts">
                                    <Form.Control onChange={textBoxFunc}
                                        type="text"
                                        id="postAQuestion"
                                        aria-describedby="postAQuestionBlock"
                                        value={questions}
                                        className="lightFonts"
                                    />
                                    <Form.Text id="postAQuestion" className="lightFonts">
                                        <span className="boldFonts">Your question would be posted anonymously. It should not be more than 400 characters. Your question will be reviewed by our fitness experts.</span>
                                    </Form.Text>
                                </Col>
                            </Row>

                            <Row >
                                <Col sm={12} md={12} lg={12} style={{ display: "flex" }}>
                                    <h5 style={{ marginLeft: "auto" }} className="lightFonts">
                                        {
                                            questions.length
                                        }
                                        /400
                                    </h5>
                                </Col>
                            </Row>
                        </Container>
                    }
                    {userLogin.userInfo && <hr />}

                    <Row>
                        <Col md={6} sm={12} lg={6} style={{ marginBottom: "2vh" }}>
                            <FormControl

                                type="search"
                                placeholder="Enter keyword"
                                className="me-2"
                                aria-label="Search" onChange={(event) => {
                                    setKeyword(event.target.value)
                                    if (event.target.value.length === 0) {
                                        setFilteredQuestionsList(questionsList)
                                    }
                                }}
                            />
                        </Col>
                        <Col md={2} sm={12} lg={2}>
                            <Button className="btn-block w-100" type="button" variant="success" onClick={filterFunc}>Filter</Button>
                        </Col>
                        <Col style={{ maxHeight: "35vh" }} md={4} sm={12} lg={4}>
                            <div style={{ height: "100%" }}>
                                <img
                                    className="d-block w-100"
                                    src={dashboardPNG}
                                    alt="First slide"
                                    style={{ height: "100%", width: "100%" }}
                                />
                            </div>
                        </Col>
                    </Row>
                    {
                        filteredQuestionsList.map(i => {
                            return <QuestionCard key={i._id} id={i._id} quest={i.questions} keyword={keyword} ButtonText="Answer" />
                        })
                    }
                </>
                }
            </Container>
        </>
    )
}
export default DashboardQuestion