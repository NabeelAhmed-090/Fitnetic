import React,{useState,useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";


const DashboardAnswers = () => {
    const [answers, setAnswers] = useState([])
    const {id} = useParams()
    useEffect(() => {
        async function getAnswers() { 
            const result = await axios.get(`/api/dashboard/answers/${id}`)
            const { data } = result
            setAnswers(data)
        }
        getAnswers()
    }, [])
  return (
    <div>
        {
        answers.map((i) => {
                    return <h1 key={i}>{i}</h1>
                })
        }
    </div>
  )
}

export default DashboardAnswers