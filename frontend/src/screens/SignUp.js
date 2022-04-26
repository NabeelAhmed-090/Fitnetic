import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../actions/userActions'

//name, age, password, weight, email, height, image
const SignUp = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [password, setPassword] = useState("")
    const [weight, setWeight] = useState(0)
    const [email, setEmail] = useState("")
    const [height, setHeight] = useState(0)
    const [image, setImage] = useState("")
    

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    return (
        <div>
            <h1>SIGNUP</h1>
            <input type="text" placeholder='name' onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder='age' onChange={(event) => setAge(event.target.value)} />
            <input type="text" placeholder='password' onChange={(event) => setPassword(event.target.value)} />
            <input type="text" placeholder='weight' onChange={(event) => setWeight(event.target.value)} />
            <input type="text" placeholder='email' onChange={(event) => setEmail(event.target.value)} />
            <input type="text" placeholder='height' onChange={(event) => setHeight(event.target.value)} />
            <input type="text" placeholder='image' onChange={(event) => setImage(event.target.value)} />
            <button onClick={() => {
                dispatch(signup(name, age, password, weight, email, height, image))
            }}>signup</button>
        </div>
    )
}

export default SignUp