import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login/Login'
import Settings from './screens/Settings/Settings'
import Signup from './screens/Signup/Signup'
import Footer from './components/Footer'
import Header from './components/Header'
import Homepage from './screens/Homepage/Homepage'
import Admin from './screens/Admin/Admin'
import DashboardQuestion from './screens/Dashboard/DashboardQuestion'
import DashboardAnswers from './screens/Dashboard/DashboardAnswers'

const App = () => {
  return (
    <>
      {/* backgroundColor: "#C8C8C8" */}
      <Header />
      <div style={{ minHeight: "90vh", margin: "0" }}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/api/users/signup" element={<Signup />} exact />
            <Route path="/api/login" element={<Login />} exact />
            <Route path="/api/users/profile/update" element={<Settings />} exact />
            <Route path="/api/dashboard" element={<DashboardQuestion />} exact />
            <Route path="/api/dashboard/answers/:id" element={<DashboardAnswers />} exact />
            <Route path="/api/admin" element={<Admin />} exact />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App