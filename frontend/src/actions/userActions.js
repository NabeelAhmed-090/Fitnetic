import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL,
    USER_SIGNUP_SUCCESS, USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL
} from "../constants/userConstants";

import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
        var config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('/api/users/login',
            { email, password },
            config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
}

export const signup = (name, age, password, weight, email, height) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST,
        })
        var config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post('/api/users/signup',
            { name, age, password, weight, email, height },
            config)

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const update = (name, age, weight, password, height, email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        })
        var config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.put('/api/users/profile/update',
            { name, age, weight, password, height, email },
            config)
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteUser = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        var config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        await axios.delete('/api/users/profile/delete',
            { data: { email: email } },
            config)
        dispatch({
            type: USER_DELETE_SUCCESS
        })
        localStorage.removeItem('userInfo')
        dispatch({
            type: USER_LOGOUT
        })
    }
    catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
