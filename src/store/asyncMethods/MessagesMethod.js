import axios from "axios";
import { setAllRecruiterMessages, setRecruiterMessages } from "../reducers/MessagesReducer";

export const sendMessageAction = (state) => {
    // console.log(state)
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
          const {data: {response}} = await axios.post("https://job-portal-server-nilesh133.vercel.app/send-message", state, config);
          dispatch(setRecruiterMessages(response));
        }
        catch(err){
        //    console.log(err);
        }
    }
}

export const FetchRecruiterMessagesAction = (state) => {
    // console.log(state)
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
          const {data: {response}} = await axios.get(`https://job-portal-server-nilesh133.vercel.app/fetch-recruiter-messages/${state.recruiter_id}`, state, config);
          dispatch(setRecruiterMessages(response));
        }
        catch(err){
        //    console.log(err);
        }
    }
}

export const FetchAllRecruiterMessages = () => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
          const {data: {response}} = await axios.get('https://job-portal-server-nilesh133.vercel.app/fetch-all-recruiter-messages', config);
          dispatch(setAllRecruiterMessages(response));
        }
        catch(err){
        //    console.log(err);
        }
    }
}

