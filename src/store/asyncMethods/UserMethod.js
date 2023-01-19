import axios from "axios";
import { setToken } from "../reducers/AuthReducer";
import {useSelector} from "react-redux";
export const UpdateUserProfileAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        // console.log(token)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.post("https://job-portal-server-nilesh133.vercel.app/update-user-profile", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
        }
        catch(err){
            console.log(err.response.data);
        }
    }
}

export const UpdateRecruiterLogoAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.post("/update-recruiter-logo", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
        }
        catch(err){
            console.log(err.response.data);
        }
    }
}

export const UpdateRecruiterAboutAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.post("/update-recruiter-about", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
        }
        catch(err){
            console.log(err.response.data);
        }
    }
}