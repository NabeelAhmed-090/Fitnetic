import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../actions/userActions'

const Settings = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    // const email = userInfo.email
    const email = "HK@gmail.com"
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [password, setPassword] = useState("")
    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [image, setImage] = useState("")

    return (
        <div>
            <h1>SETTINGS</h1>
            <h2>{email}</h2>
            <input type="text" placeholder='name' onChange={(event) => setName(event.target.value)} />
            <input type="text" placeholder='age' onChange={(event) => setAge(event.target.value)} />
            <input type="text" placeholder='weight' onChange={(event) => setWeight(event.target.value)} />
            <input type="text" placeholder='height' onChange={(event) => setHeight(event.target.value)} />
            <input type="text" placeholder='image' onChange={(event) => setImage(event.target.value)} />
            <input type="text" placeholder='password' onChange={(event) => setPassword(event.target.value)} />
            <button onClick={() =>
                dispatch(update(name, age, weight, password, height, image, email))
            }>Change</button>
        </div>
    )
}

export default Settings