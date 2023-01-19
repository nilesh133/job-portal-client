import axios from "axios";
import { setLoadingFalse, setLoadingTrue, setToken } from "../reducers/AuthReducer";
import { setRecruiterJobs, setUserAllJobs, setRecruiterSingleJob, setUserSingleJob, setUserProfileViewData, setJobPostMessage, setJobPostErrors } from "../reducers/JobReducer";
import { setRedirectTrue, setMessage } from "../reducers/AuthReducer";
import { setRecruiterMessages } from "../reducers/MessagesReducer";

export const JobPostAction = (state) => {
    // console.log(state);
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            dispatch(setLoadingTrue());
            const {data} = await axios.post("/job-post", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg))
            dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(setJobPostErrors(err.response.data.errors))
            console.log(err.response.data);
        }
    }
}

export const FetchRecruiterJobsAction = (id) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            dispatch(setLoadingTrue());
            const { data } = await axios.get(`https://job-portal-server-nilesh133.vercel.app/recruiter-jobs/${id}`, config);
            // console.log(data);
            dispatch(setRecruiterJobs(data.response))
            dispatch(setLoadingFalse());
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

export const FetchRecruiterSingleJobAction = (companyname, jobprofile, id) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            dispatch(setLoadingTrue());
            const { data } = await axios.get(`https://job-portal-server-nilesh133.vercel.app/recruiter-job/${companyname}/${jobprofile}/${id}`, config);
            // console.log(data);
            dispatch(setRecruiterSingleJob(data.response))
            dispatch(setLoadingFalse());
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}


export const FetchUserAllJobsAction = () => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            dispatch(setLoadingTrue())
            const { data } = await axios.get("https://job-portal-server-nilesh133.vercel.app/user-all-jobs", config);
            dispatch(setUserAllJobs(data.response))
            dispatch(setLoadingFalse())
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

export const FetchUserSingleJobAction = (companyname, jobprofile, id) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            dispatch(setLoadingTrue());
            const { data: {response} } = await axios.get(`https://job-portal-server-nilesh133.vercel.app/user-all-jobs/${companyname}/${jobprofile}/${id}`, config);
            dispatch(setUserSingleJob(response))
            dispatch(setLoadingFalse());
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

export const UserJobApplyAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            dispatch(setLoadingTrue());
            const { data } = await axios.post("https://job-portal-server-nilesh133.vercel.app/user-job-apply", state, config);
            localStorage.setItem('myToken', data.token);
            dispatch(setRedirectTrue());
            dispatch(setToken(data.token));
            dispatch(setUserSingleJob(data.updatedJob));
            dispatch(setMessage(data.msg))
            dispatch(setLoadingFalse());
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

export const FetchUserProfileViewAction = (id) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
      
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            dispatch(setLoadingTrue());
            const { data: {response} } = await axios.get(`https://job-portal-server-nilesh133.vercel.app/user-profile-view/${id}`, config);
            dispatch(setUserProfileViewData(response));
            dispatch(setLoadingFalse());
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

export const SetJobViewStatusAction = (user_id, companyname, recruiterid) => {
    // console.log(user_id)
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
      
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const { data } = await axios.post(`https://job-portal-server-nilesh133.vercel.app/set-job-view-status/${user_id}/${companyname}/${recruiterid}`, user_id, config);
            
        } catch (error) {
            // console.log(error.response.data);
        }
    }
}

