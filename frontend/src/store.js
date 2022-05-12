import { createStore } from 'redux'
import { combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userUpdateReducer, userSignupReducer, userDeleteReducer } from './reducers/userReducers'
import { adminLoginReducer } from './reducers/adminReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    adminLogin: adminLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const adminInfoFromStorage = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    adminLogin: { adminInfo: adminInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store