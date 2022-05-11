import React,{useState,useEffect} from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"


const DashboardAnswers = () => {
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        async function getAnswers() {
            const {id} = useParams()
            const result = await axios.get(`http://localhost:3000/api/dashboard/answers/${id}`)
            const { data } = result
            setAnswers(data)
        }
        getAnswers()
    }, [])
  return (
    <div>
        {
        answers.map((i) => {
                    return <h1>i</h1>
                })
        }
    </div>
  )
}

export default DashboardAnswers