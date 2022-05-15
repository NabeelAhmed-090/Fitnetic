import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import QuestionCard from './QuestionCard'
import Loader from './Loader'

const Question = () => {
    const [questions, setQuestions] = useState([{}])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getQuestions() {
            setLoading(true)
            const result = await axios.get("/api/dashboard")
            const { data } = result
            setQuestions(data)
            setLoading(false)
        }
        getQuestions()
    }, [])

    return (
        <>
            {loading === true ? <Loader /> :
                <Container style={{ backgroundColor: "#F0F0F0", marginTop: "3vh", minHeight: "60vh" }}>
                    {
                        questions.map(i => {
                            return <QuestionCard key={i._id} id={i._id} quest={i.questions} ButtonText="Reply" />
                        })
                    }
                </Container>
            }
        </>
    )
}

export default Question