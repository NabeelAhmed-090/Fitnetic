import React, { useState, useEffect } from 'react'
import axios from 'axios'
import userPNG from '../Image/adminUser.png'
import { Container, Row, Col, Button } from 'react-bootstrap'
const User = () => {
    const [users, setUsers] = useState([{}])
    useEffect(() => {
        async function getUsers() {
            const result = await axios.get("/api/admin/users")
            const { data } = result
            setUsers(data)
        }
        getUsers()
    }, [])


    return (
        <Container style={{ backgroundColor: "#F0F0F0", marginTop: "3vh", minHeight: "60vh" }}>
            {
                users.map(i => {
                    return (
                        <Row key={i.email}>
                            <Col sm={3} lg={3} md={3}>
                                <div style={{ height: "20vh" }}>
                                    <img
                                        className="d-block"
                                        src={userPNG}
                                        alt="First slide"
                                        style={{ height: "100%", width: "100%", borderRadius: "50%" }}
                                    />
                                </div>
                            </Col>
                            <Col style={{ marginTop: "5vh" }} sm={7} lg={7} md={7}>
                                <Row>
                                    <Col sm={12} lg={12} md={12}>
                                        <h5><b>Email : </b>{i.email}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} lg={12} md={12}>
                                        <h5><b>Name : </b>{i.name}</h5>
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ marginTop: "5vh" }} sm={1} lg={1} md={1}>
                                <Button onClick={async () => {
                                    var config = {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                    }
                                    await axios.delete('/api/users/profile/delete',
                                        { data: { email: i.email } },
                                        config)
                                    setUsers(users.filter(itr => itr.email !== i.email))
                                }} variant="dark">
                                    <h3 style={{ marginLeft: "auto" }}><i className="fa-solid fa-trash"></i></h3>
                                </Button>
                            </Col>
                            <hr />
                        </Row>
                    )
                })
            }
        </Container >
    )
}

export default User