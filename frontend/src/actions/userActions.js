import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL
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

export const update = (name, age, weight, password, height, image, email) => async (dispatch) => {

    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        })
        var config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('/api/users/settings',
            { name, age, weight, password, height, image, email },
            config)
        dispatch({
            type: USER_UPDATE_SUCCESS,
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
