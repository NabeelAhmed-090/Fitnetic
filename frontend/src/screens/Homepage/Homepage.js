import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const dispatch = useDispatch()
    let history = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history("/api/login")
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <div>Homepageeee</div>
        </>
    )
}

export default Homepage



