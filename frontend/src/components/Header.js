import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <>
            <Navbar style={{ height: "8vh", backgroundColor: "#FEE715CF" }} >
                <Container>
                    <Navbar.Brand href="/AboutUs"><b>FITNETIC</b></Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/api/dashboard">Dashboard</Nav.Link>
                        {!userLogin.userInfo && <Nav.Link href="/api/users/login">Login</Nav.Link>}
                        {userLogin.userInfo && <Nav.Link href="/">Home</Nav.Link>}
                        {userLogin.userInfo && <Nav.Link href="#">Goal</Nav.Link>}
                        {userLogin.userInfo && <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Profile"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="/api/users/profile/update">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} href="/api/users/login">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header