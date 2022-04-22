import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"

const Header = () => {
    return (
        <>
            <Navbar style={{ height: "8vh", backgroundColor: "#FEE715CF" }} >
                <Container>
                    <Navbar.Brand href="#home"><b>FITNETIC</b></Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Updates</Nav.Link>
                        <Nav.Link href="#pricing">Dashboard</Nav.Link>
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action/3.1">Update Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header