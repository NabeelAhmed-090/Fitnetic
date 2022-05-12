import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { adminlogoutFunc } from '../actions/adminActions'
import '../index.css'


const Header = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const adminLogin = useSelector((state) => state.adminLogin)

    const dispatch = useDispatch()
    const handleLogout = () => {
        if (userLogin.userInfo) {
            console.log("user")
            dispatch(logout())
        }
        else {
            console.log("check")
            dispatch(adminlogoutFunc())
        }
    }
    return (
        <>
            <Navbar style={{ height: "8vh", backgroundColor: "#FEE715CF" }} >
                <Container>
                    <Navbar.Brand href="/AboutUs" className="fonts"><b>FITNETIC</b></Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="/api/dashboard">Dashboard</Nav.Link>
                        {!userLogin.userInfo && !adminLogin.adminInfo && <Nav.Link href="/api/users/login">Login</Nav.Link>}
                        {(userLogin.userInfo || adminLogin.adminInfo) && <Nav.Link href="/">Home</Nav.Link>}
                        {userLogin.userInfo && <Nav.Link href="#">Goal</Nav.Link>}
                        {(userLogin.userInfo || adminLogin.adminInfo) && <Nav>
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