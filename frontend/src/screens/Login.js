import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    return (
        <div>
            <h1>LOGIN</h1>
            <input type="text" placeholder='email' onChange={(event) => setEmail(event.target.value)} />
            <input type="text" placeholder='password' onChange={(event) => setPassword(event.target.value)} />
            <button onClick={() => {
                dispatch(login(email, password))
            }}>login</button>
        </div>
    )
}

export default Login