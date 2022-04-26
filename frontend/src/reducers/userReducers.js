import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL,
    USER_SIGNUP_SUCCESS, USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL

} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return { loading: false, userInfo: {} }
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}