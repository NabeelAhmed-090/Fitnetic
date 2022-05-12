import axios from "axios";
import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/QuestionCard";
import { Container,Row,Col,Form,Button,FormControl,Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";

const DashboardQuestion = () => {
    const [questionsList, setQuestionsList] = useState([])
    const [questions, setQuestions] = useState("")
    const [filteredQuestionsList, setFilteredQuestionsList] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        
        async function getQuestions() {
            const result = await axios.get("/api/dashboard")
            const { data } = result
            setQuestionsList(data)
            if(filteredQuestionsList.length===0){
                setFilteredQuestionsList(data)
            }
            
        }
        getQuestions()
    }, [])
    
    const textBoxFunc=(event)=>{
        if(event.target.value.length<=400)
        {
            setQuestions(event.target.value)
        }     
    }

    const postQuestionFunc=async()=>{
        if(questions.length!==0)
        {
            var config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
    
            await axios.post('/api/dashboard/post',
                { questions},
                config)

            setQuestions("")
        }
    }

    const filterFunc=()=>{
        setFilteredQuestionsList([])
        setFilteredQuestionsList(
            questionsList.filter(i=>i.questions.search(keyword)!==-1)
        )
    }

    const userLogin=useSelector(state=>state.userLogin)

    return (
        <>
        <Container >
            <Navbar style={{backgroundColor:"#C8C8C8"}} expand="lg">
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Enter keyword"
                    className="me-2"
                    aria-label="Search" onChange={(event)=>{
                        setKeyword(event.target.value)
                        if(event.target.value.length===0){
                            setFilteredQuestionsList(questionsList)
                        }
                    }}
                    />
                    <Button type="button" variant="success" onClick={filterFunc}>Filter</Button>
                </Form>
                </Navbar.Collapse>
            
            </Navbar>
            {
            userLogin.userInfo &&
            <Container style={{marginTop:"5vh"}} className="shadow p-3 mb-5 bg-white rounded">
                <Row style={{ minHeight:"10vh", maxHeight:"20%", textDecoration:"none", minWidth: "35vw" }}>
                    <Col sm={11} md={11} lg={11} >
                        <h5 >
                        POST A QUESTION
                        </h5>
                    </Col>
                    <Col sm={1} md={1} lg={1} >
                        <Button variant="dark" type="button" onClick={postQuestionFunc}>
                            POST
                         </Button>
                    </Col>     
                </Row>
                 
                    <Row style={{ minHeight:"10vh", maxHeight:"20%", textDecoration:"none", minWidth: "35vw"}}>
                        <Col sm={12} md={12} lg={12} >
                            <Form.Control onChange={textBoxFunc}
                                type="text"
                                id="postAQuestion"
                                aria-describedby="postAQuestionBlock"
                                value={questions}
                            />
                            <Form.Text id="postAQuestion" muted>
                                Your question would be posted anonymously. It should not be more than 400 characters. Your question will be reviewed by our fitness experts.
                            </Form.Text>
                        </Col>    
                    </Row>
                
                <Row >
                    <Col sm={12} md={12} lg={12} style={{display:"flex"}}>
                        <h5 style={{marginLeft:"auto"}}>
                            {
                                questions.length
                            }
                            /400
                        </h5>
                    </Col>
                </Row>
            </Container>
            }
            {
                filteredQuestionsList.map(i => {
                    return <QuestionCard key={i._id}  id={i._id} quest={i.questions} />
                })
            }
        </Container>
        </>
    )
}
export default DashboardQuestion