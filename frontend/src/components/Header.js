import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
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
                        <Nav.Link href="/api/homepage">Home</Nav.Link>
                        <Nav.Link href="#">Goal</Nav.Link>
                        <Nav.Link href="#">Dashboard</Nav.Link>
                        <Nav>
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
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header