import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { USER_LOGOUT } from '../constants/userConstants'

const Header = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch({
            type: USER_LOGOUT,
        })
    }
    return (
        <>
            <Navbar style={{ height: "8vh", backgroundColor: "#FEE715CF" }} >
                <Container>
                    <Navbar.Brand href="/AboutUs"><b>FITNETIC</b></Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="/Settings">Updates</Nav.Link>
                        <Nav.Link href="#pricing">Dashboard</Nav.Link>
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="/api/users/settings">Update Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} href="/api/users/login">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header