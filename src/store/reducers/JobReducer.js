import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    recruiterJobs : [],
    recruiterSingleJob: {},
    userAllJobs: [],
    userSingleJob: {},
    userProfileViewData: {},
    // jobPostMessage: '',
    jobPostErrors: []
}

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setRecruiterJobs: (state, action) => {
            state.recruiterJobs =  action.payload
        },
        setRecruiterSingleJob: (state, action) => {
            state.recruiterSingleJob =  action.payload
        },
        setUserAllJobs: (state, action) => {
            state.userAllJobs = action.payload
        },
        setUserSingleJob: (state, action) => {
            state.userSingleJob = action.payload
        },
        setUserProfileViewData: (state, action) => {
            state.userProfileViewData = action.payload
        },
        // setJobPostMessage: (state, action) => {
        //     state.jobPostMessage = action.payload
        // },
        // setJobPostErrors: (state, action) => {
        //     state.jobPostErrors = action.payload
        // }
    }
})

export const {setRecruiterJobs, setRecruiterSingleJob, setUserAllJobs, setUserSingleJob, setUserProfileViewData, setJobPostMessage, setJobPostErrors} = jobSlice.actions;
export default jobSlice.reducer;