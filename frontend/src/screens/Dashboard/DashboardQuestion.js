import axios from "axios";
import React, { useState, useEffect } from "react";
import QuestionCard from "../../components/QuestionCard";
import { Container } from "react-bootstrap";

const DashboardQuestion = () => {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        async function getQuestions() {
            const result = await axios.get("/api/dashboard")
            const { data } = result
            setQuestions(data)
        }
        getQuestions()
    }, [])

    return (
        <Container >
            {
                questions.map(i => {
                    return <QuestionCard key={i._id}  id={i._id} quest={i.questions} />
                })
            }
        </Container>
    )
}
export default DashboardQuestion