import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Button, Dropdown, Form } from 'react-bootstrap'
import plusPNG from '../Image/plus.png'
import deletePNG from '../Image/delete.png'
import './Workout.css'
import Loader from './Loader'

const Diet = () => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [foodList, setFoodList] = useState([
        {
            name:"test",
            quantity: 0,
            calories: 998
        },
        {
            name:"hellllo",
            quantity: 0,
            calories: 130
        }
    ])   
    const [food, setFood] = useState([]) //frontend
    const [diet, setDiet] = useState([])
    const [check, setCheck] = useState(true)

    useEffect(() => {
        async function getFood() {
            setLoading(true)
            const result = await axios.get("/api/diet/food")
            const { data } = result
            setFoodList(data)
            setLoading(false)
        }
        getFood()
        
    }, [])

    return(
        <div style={{minHeight:'100vh'}}>
        {loading===true?<Loader/>:
        <>
    
            <Dropdown>
        <Dropdown.Toggle style={{ position: "static !important", width: "100% !important" }} className="btn-block w-100 mt-3" variant="dark" id="dropdown-basic">
            View Food List
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ position: "static !important", width: "100% !important", textAlign: "center" }} className="btn-block w-100 mt-3 p-1">
                            <Dropdown.Item href="#">
                                <Row>
                                    <Col md={6} lg={6} sm={6}>
                                        <b>Name</b>
                                    </Col>
                                    <Col md={6} lg={6} sm={6}>
                                        <b>Calories</b>
                                    </Col>
                                </Row>
                            </Dropdown.Item>
                            {
                                foodList.map(i => {
                                    return (
                                        <Dropdown.Item href="#" onClick={() => {
                                            setFoodList(foodList.filter(itr => itr.name !== i.name))
                                            setFood([...food, i])

                                        }}>
                                            <Row>
                                                <Col md={6} lg={6} sm={6}>
                                                    {i.name}
                                                </Col>
                                                <Col md={6} lg={6} sm={6}>
                                                    {i.calories}
                                                </Col>
                                            </Row>
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                    {
                        food.map(i=>{
                            return(
                                <>
                                <h1>{i.name} {i.calories} {i.quantity}</h1>
                                <Form.Control
                                onChange={(event) => {
                                    const obj={ name:i.name, calories:i.calories, quantity:event.target.value}
                                    setFood(food.filter(itr=>itr.name!==i.name))
                                    //setFood([...food,obj])
                                    
                                }}
                                type="text"
                                placeholder="Enter a unique name for this workout"
                                id="description"
                                aria-describedby="descriptionlock"
                                value={name}
                                
                            />
                            </>
                            )

                        })

                    }
                    </div>
                </>
                }
        </div>
    )

   
}

export default Diet