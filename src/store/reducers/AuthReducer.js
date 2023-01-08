import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
    token: "",
    user: "",
    registerErrorsArray: [],
    loginErrorsArray: [],
    redirect: false,
    message: '',
    loading: false
}

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    // console.log(decodeToken)
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem('myToken');
        return null;
    }
    else {
        return decodeToken;
    }
}

const token = localStorage.getItem('myToken');
if (token) {
    // console.log(token);
    const decoded = verifyToken(token);
    if (decoded) {
        initialState.token = token;
        const { user } = decoded;
        initialState.user = user;
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            const decoded = verifyToken(action.payload);
            // console.log(decoded)
            const { user } = decoded;
            state.user = user
        },
        registerErrors: (state, action) => {
            state.registerErrorsArray = action.payload;
        },
        loginErrors: (state, action) => {
            state.loginErrorsArray = action.payload;
            // console.log(state.loginErrorsArray)
        },
        setRedirectTrue: (state, action) => {
            state.redirect = true
        },
        setRedirectFalse: (state, action) => {
            state.redirect = false
        },
        setLoadingTrue: (state, action) => {
            state.loading = true
        },
        setLoadingFalse: (state, action) => {
            state.loading = false
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        removeMessage: (state, action) => {
            state.message = ''
        },
        logout: (state, action) => {
            state.token = ''
            state.user = ''
        }
    }
})

export const { setToken, logout, registerErrors, loginErrors, setRedirectTrue, setRedirectFalse, setMessage, removeMessage, setLoadingTrue, setLoadingFalse } = authSlice.actions;

export default authSlice.reducer;