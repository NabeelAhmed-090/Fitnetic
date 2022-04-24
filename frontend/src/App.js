import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import Settings from './screens/Settings'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/api/users/login" element={<Login />} exact />
        <Route path="/api/users/settings" element={<Settings />} exact />
      </Routes>
    </Router>
  )
}

export default App