import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logoPNG from '../Image/user.png'
import userPNG from '../Image/adminUser.png'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Loader from './Loader'
import './User.css'

const User = () => {
    const [users, setUsers] = useState([{}])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function getUsers() {
            setLoading(true)
            const result = await axios.get("/api/admin/users")
            const { data } = result
            setUsers(data)
            setLoading(false)
        }
        getUsers()
    }, [])


    return (
        <>
            {loading === true ? <Loader /> :
                <Container style={{ backgroundColor: "#F0F0F0", marginTop: "3vh", minHeight: "60vh" }}>
                    <Row style={{ maxHeight: "25vh" }}>
                        <Col md={2} sm={12} lg={2} className="cols mb-5 mt-2">
                            <div style={{ height: "15vh", display: "flex", justifyContent: "center" }} >
                                <img
                                    className="d-block"
                                    src={logoPNG}
                                    alt="First slide"
                                    style={{ height: "100%", width: "60%" }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} lg={12} sm={12}>
                            {
                                users.map(i => {
                                    return (
                                        <Row key={i.email}>
                                            <Col sm={3} lg={3} md={3} className="mb-3">
                                                <div style={{ height: "20vh" }}>
                                                    <img
                                                        className="d-block"
                                                        src={userPNG}
                                                        alt="First slide"
                                                        style={{ height: "100%", width: "100%", borderRadius: "50%" }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col style={{ margin: "auto" }} sm={7} lg={7} md={7}>
                                                <Row className="mt-1">
                                                    <Col sm={12} lg={6} md={6} style={{ display: "flex" }}>
                                                        <h5 style={{ margin: "auto" }}><b>{i.email}</b></h5>
                                                    </Col>
                                                    <Col sm={12} lg={6} md={6} style={{ display: "flex" }}>
                                                        <h5 style={{ margin: "auto" }}><b>{i.name}</b></h5>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col style={{ marginTop: "5vh" }} sm={12} lg={1} md={1}>
                                                <Button className="btn-block w-100 mb-2" onClick={async () => {
                                                    setLoading(true)
                                                    var config = {
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                        },
                                                    }
                                                    await axios.delete('/api/users/profile/delete',
                                                        { data: { email: i.email } },
                                                        config)
                                                    setUsers(users.filter(itr => itr.email !== i.email))
                                                    setLoading(false)
                                                }} variant="dark">
                                                    <h3 style={{ marginLeft: "auto" }}><i className="fa-solid fa-trash"></i></h3>
                                                </Button>
                                            </Col>
                                            <hr />
                                        </Row>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Container >
            }
        </>
    )
}

export default User