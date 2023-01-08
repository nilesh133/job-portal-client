import axios from "axios";
import { registerErrors, setToken, loginErrors, setRedirectTrue, setMessage, logout, setLoadingTrue, setLoadingFalse } from "../reducers/AuthReducer";

export const RecruiterRegisterAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            dispatch(setLoadingTrue());
            const {data} = await axios.post("https://job-portal-server-nilesh133.vercel.app/register-recruiter", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg));
            dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(registerErrors(err.response.data.errors))
            // console.log(err.response);
        }
    }
}

export const UserRegisterAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            dispatch(setLoadingTrue());
            const {data} = await axios.post("https://job-portal-server-nilesh133.vercel.app/register-user", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg));
            dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(loginErrors(err.response.data.errors))
            // console.log(err.response);
        }
    }
}

export const RecruiterLoginAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            dispatch(setLoadingTrue());
            const {data} = await axios.post("https://job-portal-server-nilesh133.vercel.app/recruiter-login", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg));
            dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(registerErrors(err.response.data.errors))
            // console.log(err.response);
        }
    }
}

export const UserLoginAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            dispatch(setLoadingTrue());
            const {data} = await axios.post("https://job-portal-server-nilesh133.vercel.app/user-login", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg));
            dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(loginErrors(err.response.data.errors))
            // console.log(err.response.data.errors);
        }
    }
}

export const UserLogoutAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            dispatch(setLoadingTrue())
            const {data} = await axios.post("https://job-portal-server-nilesh133.vercel.app/logout", state, config);
            dispatch(setMessage(data.msg))
            dispatch(logout());
            dispatch(setRedirectTrue());
            dispatch(setLoadingFalse())
        }
        catch(err){
            // console.log(err.response.data.errors);
        }
    }
}