import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import Settings from './screens/Settings/Settings'
import Signup from './screens/Signup/Signup'
import AboutUs from './screens/AboutUs'
import Footer from './components/Footer'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#DCDCDC", margin: "0" }}>
        <Router>
          <Routes>
            <Route path="/api/users/signup" element={<Signup />} exact />
            <Route path="/api/users/login" element={<Login />} exact />
            <Route path="/api/users/settings" element={<Settings />} exact />
            <Route path="/AboutUs" element={<AboutUs />} exact />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App